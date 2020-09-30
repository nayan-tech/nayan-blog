---
title: GCP MySQL replica setup
date: 2020-09-14 19:06:35
author: Abhishek Rana
category: Web
tags:
  - GCP
  - MySQL replica
  - Data Protection
  - NAYAN
  - India
---

![GCP MySQL Replica](/blog/Web/akr-replica-setup/banner.png)

CloudSQL is fully managed MySQL / PostgreSQL database system. CloudSQL reduces the workload for DBAs and anyone can easily manage even without a DBA. In many cases, people wants to have a replica of their production database for Testing purpose or even some other purpose. CloudSQL provides the flexibility to have external replicas on VM or On-prem. In this blog we are going to configure external replica for CloudSQL.

## MySQL with GTID
A global transaction identifier (GTID) is a unique identifier created and associated with each transaction committed on the server of origin (master). This identifier is unique not only to the server on which it originated, but is unique across all servers in a given replication setup. There is a 1-to-1 mapping between all transactions and all GTIDs. — From MySQL Documentation

To understand more about GTID, please refer the below link. [MySQL reference](https://dev.mysql.com/doc/refman/5.6/en/replication-gtids-concepts.html)

## The process overview
- Create the CloudSQL — Master.
- Create the Compute engine and setup MySQL — Slave.
- Enable GTID in the Slave.
- Take the dump from the master along with the GTID.
- Restore the dump on the slave.
- Configure Replication.

## Create the CloudSQL
- Go to the [CloudSQL console](https://console.cloud.google.com/sql/).
- Create a new MySQL 2nd generation Instance.
- In the show advanced configuration enable the below items.
  1. Automatic Backups
  2. Enable Binary logging
- Lets wait for the Instance creation complete.
- Refer the below link for GCP Doc to create the CloudSQL [Link](https://cloud.google.com/sql/docs/mysql/create-instance)

## Create the Compute Engine VM
- Go to [Compute Engine console](https://console.cloud.google.com/compute/instancesAdd) and create the VM.
- Give a name and choose the CPU, Memory, OS, and Networking and etc.
- It should be in Public and assign a static external IP address.
- Lets wait for Instance creation complete.
- More details step for creating the VM, please refer the [link](https://cloud.google.com/compute/docs/instances/create-start-instance).

## Install MySQL 5.7 on the Slave
```
-- This is command for install mysql for ubuntu 18.04
apt-get update
apt-get install mysql-server
```

## Enable GTID
```
-- This file location is for Ubuntu 18.04
vi /etc/mysql/mysql.conf.d/mysqld.cnf
server-id                = 1212
gtid_mode                = ON
enforce_gtid_consistency = ON
log_slave_updates        = ON
replicate-ignore-db      = mysql
binlog-format            = ROW
expire_logs_days         = 1
read_only                = ON
log_bin                  = /var/log/mysql/mysql-bin.log
```

## Setting up the database on Master
- Connect to the CloudSQL instance.
- Create a database called sqladmin.
- Create a table and insert the sample data.
- Create an user for replication.

```
create database sqladmin;
use sqladmin;
create table test_tbl (numbers int);
insert into test_tbl values (1),(2),(3);
create user 'rep_user'@'%' identified by 'rep_password';
GRANT REPLICATION SLAVE ON *.* TO  'rep_user'@'%';
flush privileges;
```

## Prepare the Secondary
- Take the dump of the Master database using the below command.
```
mysqldump --databases sqladmin -h CLOUD_SQL_IP -u root -p \ 
--single-transaction \
--master-data=1 \
--routines \
--triggers \
--events \
--flush-privileges \
--hex-blob \
--default-character-set=utf8 > sqladmin.sql
```

- Restore the Backup on the Slave.
```
-- Restore the backup
mysql -u username -p sqladmin < sqladmin.sql
-- Sometimes you will end up with an error like ERROR 1840 (HY000) at line 24: @@GLOBAL.GTID_PURGED can only be set when @@GLOBAL.GTID_EXECUTED is empty. Then you need to run the below command on the Slave MySQL.
RESET MASTER;
```

## Establish the replication
- Login to the slave and run the below query.
```
CHANGE MASTER TO MASTER_HOST='CLOUD_SQL_IP', 
MASTER_USER='rep_user', 
MASTER_PASSWORD='rep_password', 
MASTER_AUTO_POSITION=1;
```
- Then Check the status.
```
show slave status\G;
```

Sometimes you will get the below error.
```
Error 'Operation ALTER USER failed for 'root'@'%'' on query. Default database: ''. Query: 'ALTER USER 'root'@'%' IDENTIFIED WITH 'mysql_native_password' AS '*81F5E21E35407D884A6CD4A731AEBFB6AF209E1B''
```
This means the command executed on the Master and slave already has its own password. A deep blog about this issue [here](https://avdeo.com/2015/03/04/restoring-slave-when-gtid-is-enabled-on-master/).

## Fix this error
- Take a note Retrieved_Gtid_Set from the slave status.
- Reset the master settings in the slave and purge it GTID.
```
reset master;
set global GTID_PURGED="afee7444-8ff7-11e8-8ed3-42010a800056:8-9093";
start slave;
```

## Check the replication
- Insert some data on the CloudSQL.
```
insert into sqladmin.test_tbl values (4),(5);
```
- Check the data on Slave.
```
select * from sqladmin.test_tbl;
```

## References
1. [GCP MySQL](https://cloud.google.com/sql/docs/mysql)
2. [GCP Read replica](https://cloud.google.com/sql/docs/mysql/replication/create-replica)

## Some good reads you may like
1. [React CI/CD](https://nayan.co/blog/Web/react-cicd/)
2. [Angular Youtube integration](https://nayan.co/blog/Web/angular-youtube/)
3. [Angular maps and clusters](https://nayan.co/blog/Web/angular-maps/)

p.s. Nayan is a platform that offers high precision services for traffic monitoring and road safety. Check out our [website](https://nayan.co)