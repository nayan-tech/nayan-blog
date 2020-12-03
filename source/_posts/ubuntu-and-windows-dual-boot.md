---
title: How to install Ubuntu 20.04 alonside Windows 10?
date: 2020-10-23 08:00:00
author: Kunal Goyal 
category: AI
tags:
  - AI
  - Deep learning
  - Ubuntu
  - Kunal Goyal
---
![Featured](windows_ubuntu.png)

So when I joined the new job I got handed a new Dell G3 3500 laptop with preinstalled windows. For all the purposes of the coding and running my scripts, i had to install ubuntu alongside it. These are the steps that I followed for doing so.

After trying to install it directly I ran into the error of RST enabled. RST lock is done by intel on the os and ubuntu does not support it now. You will have to deactivate RST as well as remove Bitlocker to successfully install windows.

First of all always backup your data. Because this method worked for me doesn’t mean it will work for everyone.

Go to windows then to the registry editor. Navigate to

HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\iaStorV\

![HKEY_LOCAL_MACHINES](https://cdn-images-1.medium.com/max/2000/1*4OwYA5M4lje1aPg1-W3Uxg.png)

Double click on the start key and change its value to 0.

Double click on the iaStorV entry in the left column to expand it, select the StartOverride entry, then in the right column, change the value of key 0 to 0.

![iaStorV](https://cdn-images-1.medium.com/max/2000/1*QRtAxcbpKjNa4lgLsA1UJg.png)

Repeat this set of changes for the following path in the Registry Editor:
 
 HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\storahci\

Restart and the machine should start correctly. Although in my case the windows crashed and I had to recover it.

After a while the system starts Automatic Repair and will try a few times to do so, you will get an option to either restart or go to advanced options. Then you will see the below screen. Click on the Troubleshoot.

![:(](https://cdn-images-1.medium.com/max/2000/1*hss0O2MN6Dg6JlZofl1lNw.png)

Select Advanced options once more in the next screen:

Click on Startup repair:

![Repair Options](https://cdn-images-1.medium.com/max/2048/1*rKuhbCIPhgOLtQAAqTzsmg.png)

![Advanced Options](https://cdn-images-1.medium.com/max/2048/1*S85ymlS0FFqF30qOwjcpvg.png)

You should now be able to boot into the windows. In case you are not able to go ahead read the below part, otherwise you can skip it and go to turning off BitLocker.

**Bcdedit, Diskpart**

At the Advanced Options part above instead of the startup repair click on command prompt and follow the below

![Cmd](https://cdn-images-1.medium.com/max/2000/1*K2zMErYmP0a7YgwsZvB9Yw.png)

This will launch the Windows command prompt, where you can run commands to diagnose and repair problems, including boot-related issues. The first step is to run the disk partition tool to see and understand the disk layout.

![Disk Layout](https://cdn-images-1.medium.com/max/2048/1*3MteFpIOzzCyPvrwXWAzkg.png)

On the command line, type diskpart. Next, you will need to display the list of volumes, make sure the volume that contains Windows is correctly assigned the letter C: (if it’s not, you will need to change this), make this volume active, and then run the boot repair command.

The full sequence of commands is as follows:

    diskpart
    list volume
    select volume [number]
    assign letter=[letter]

For example, a “wrong” volume may be assigned the letter C:, so you will need to select it first, assign it a different letter (e.g.: F: or H:), select the volume that contains Windows, and then assign it the letter C:.

Finally, exit the diskpart utility.

    exit

Now, run the bcdedit repair command:

bcdedit /deletevalue {default} safeboot

If the above does not work, alternative commands you can run are:

    bcdedit /deletevalue {current} safeboot
    bcdedit /deletevalue safeboot

If this command completes successfully, exit the command prompt, the Windows recovery console will restart, and Windows should load normally, with the controller mode set to AHCI.

If Windows does not start correctly, you can then manually recreate the bootloader file. Follow the below steps for doing so

**Bcdboot**

To this end, you will need to access either the System partition or the EFI partition on your computer. The Windows disk layout will typically include one of these two configurations:

* A volume that contains Windows (C:) and a small hidden partition, usually 100MB in size called System partition, formatted as NTFS. It contains the files needed to start (boot) Windows, as well as recovery tools to help you diagnose and repair your system when it does not start correctly.

* On UEFI-powered computers, a volume that contains Windows (C:) and a boot partition (also called EFI), typically 256–512MB in size, formatted as FAT32. This partition will contain the files needed to start (boot) Windows.

You will need to access the partition to make the necessary changes. If you have already run the diskpart utility, you do not need to do anything at this point, you only need to check the letter that is assigned to this partition (e.g.: letter F:).

Switch to the boot partition, move the existing boot file aside, and then create a new one. The sequence of commands to do this is as follows (assuming letter F: for the boot partition):

    F:
    cd boot
    ren BCD BCD.bak
    bcdboot c:\windows /l en-us /s f: /f ALL

The bcdboot command will initialize the system partition by using BCD files from the C:\Windows folder, use the en-us locale, target the system partition assigned letter F:, and create boot files both for UEFI and BIOS.

Once this command completes, reboot. Windows should start normally. You can now re-launch the Ubuntu installer and finish the side-by-side setup of the two operating systems.

![Vola](https://cdn-images-1.medium.com/max/2000/1*T7nE9xiQgfFnzs67r2edpA.png)

**Turn BitLocker Off**

If successful now if you try to install Ubuntu you will run into another problem of Bitlock key. You should be able to turn it off in this way

* Click Start, click Control Panel, click System and Security (if the control panel items are listed by category), and then click **BitLocker **Drive Encryption.

* In the **BitLocker **Drive Encryption control panel, click **Turn Off BitLocker**.

* Click Decrypt Drive to start the decryption process.
