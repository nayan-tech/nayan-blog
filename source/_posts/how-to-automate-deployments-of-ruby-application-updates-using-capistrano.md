---
title: Automate deployments of Ruby App updates using Capistrano
date: 2020-10-31 01:12:32
author: Ashish Jajoria
categories:
- ["Ruby on Rails"]
tags: 
- backend
- rails
- ruby
- ror
- ruby on rails
- automate
- deployment
- capistrano
- Ashish Jajoria
---

When deploying a Ruby Application build, it takes multiple steps to deploy the build. Doing all those steps everytime we deploy a new build is time consuming and also there might be a case when we forgot a step for deployment that we thing won't be necessary for this deployment but it was.

Capistrano got you covered for that, It is A remote server automation and deployment tool written in Ruby. Once we setup our Capistrano config, then it only takes one command to deploy build on server and that too from your local machine, Capistrano does all the required steps on your behalf and deploys an error free build to your server.

![Capistrano](/blog/Ruby-on-Rails/how-to-automate-deployments-of-ruby-application-updates-using-capistrano/capistrano.png)

## Lets understand Directory structure of Capistrano deployment

![Directory Structure](/blog/Ruby-on-Rails/how-to-automate-deployments-of-ruby-application-updates-using-capistrano/dir.png)

1: `releases` contains all deployments in timestamped folders. Each time you command Capistrano to deploy, it clones from the Git repo to a new sub-directory inside this directory.
2: `current` is a symlink pointing to the latest successful deployment. This is updated after each successful deployment.
3: `repo` keeps a cached copy of your Git repository, for making susequent git pulls faster.
4: `shared` contains any files that should persists across deployments and releases

## Lets start automating deployments of Ruby Application updates step by step:-

1: Add `capistrano` gems to your Gemfile

```ruby
group :development do
  gem 'capistrano'
  gem 'capistrano-bundler'
  gem 'capistrano-passenger', '>= 0.1.1'

  # Remove the following if your app does not use Rails
  gem 'capistrano-rails'

  # Remove the following if your server does not use RVM
  gem 'capistrano-rvm'
end
```

2: Install gem bundle and initialize Capistrano

```shell
$ bundle install
...

$ bundle exec cap install
mkdir -p config/deploy
create config/deploy.rb
create config/deploy/staging.rb
create config/deploy/production.rb
mkdir -p lib/capistrano/tasks
create Capfile
Capified
```

3: Now edit your `Capfile` and add all the recipes that you need

```ruby
require 'capistrano/setup'
require 'capistrano/deploy'

require 'capistrano/scm/git'
install_plugin Capistrano::SCM::Git

require "capistrano/rvm"
require 'capistrano/bundler'
require 'capistrano/rails'
require 'capistrano/passenger'

# Load custom tasks from `lib/capistrano/tasks` if you have any defined
Dir.glob('lib/capistrano/tasks/*.rake').each { |r| import r }
```

4: Now update your `deploy.rb` to following code

```ruby
# config valid for current version and patch releases of Capistrano
set :application, 'my_app'
set :repo_url, 'git@github.com:myself/my_app.git'
set :branch, 'your_deployment_branch' # Default value is master
# Default value for :linked_files is []
append :linked_files, 'config/master.key', '.env.production', 'gcloud_credentials.json'

# Default value for linked_dirs is []
append :linked_dirs, 'log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system', 'public/uploads'

set :rvm_ruby_version, '2.5.3'

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for local_user is ENV['USER']
# set :local_user, -> { `git config user.name`.chomp }

# Default value for keep_releases is 5
# set :keep_releases, 5

# Uncomment the following to require manually verifying the host key before first deploy.
# set :ssh_options, verify_host_key: :secure
namespace :deploy do

  after :restart, :clear_cache do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
      # Here we can do anything such as:
      # within release_path do
      #   execute :rake, 'cache:clear'
      # end
    end
  end
end

```

5: Now update your `config/deploy/production.rb` to following configuration

```ruby
role :app, %w[your_user@your_domain]
role :web, %w[your_user@your_domain]
role :db,  %w[your_user@your_domain]

set :ssh_options, {
  keys: %w[~/.ssh/id_rsa],
  forward_agent: false,
  auth_methods: %w[publickey]
}
```

## Capistrano configuration has been completed for your project. Now prepare the server for deployment

1: Install Git

```shell
sudo apt-get install -y git
```

2: Set up a user account (if you haven't already)

```shell
# Add user account
sudo adduser your_user &&

# Setup initial SSH key
sudo mkdir -p ~your_user/.ssh &&
sudo sh -c "cat $HOME/.ssh/authorized_keys >> ~your_user/.ssh/authorized_keys" && \
sudo chown -R your_user: ~your_user/.ssh &&
sudo chmod 700 ~your_user/.ssh &&
sudo sh -c "chmod 600 ~your_user/.ssh/*"
```

3: Setup basic directory structure

```shell
sudo mkdir -p /var/www/my_app/shared
sudo chown your_user: /var/www/my_app /var/www/my_app/shared
```

4: Create initial configuration files

```shell
sudo mkdir -p /var/www/my_app/shared/config
nano /var/www/my_app/shared/config/database.yml &&
nano /var/www/my_app/shared/config/secrets.yml
```

5: Fix permissions

```shell
sudo chown -R your_user: /var/www/my_app/shared/config
chmod 600 /var/www/my_app/shared/config/database.yml
chmod 600 /var/www/my_app/shared/config/secrets.yml
```

Now configure your passenger according to the `config/deploy/production.rb` configuration.

6: Push code to your branch and start deployment

```shell
git add .
git commit -m "Capistrano integration"
git push

bundle exec cap production deploy
```

## Conclusion:-

You've successfully automated your Ruby project deployment. For more details about Capistrano, just head yourself to [Capistrano website](https://capistranorb.com/)

## References:-

1. [Capistrano official website](https://capistranorb.com/)
2. [Automating deployments of Ruby application updates through Capistrano](https://www.phusionpassenger.com/library/deploy/apache/automating_app_updates/ruby/)

## Some good reads you may like:-

1. [Override Devise Auth Token Controllers](https://nayan.co/blog/Ruby-on-Rails/override-devise-auth-token-controllers/)
2. [Paytm Gateway Integration](https://nayan.co/blog/Ruby-on-Rails/paytm-gateway-integration/)

