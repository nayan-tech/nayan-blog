---
title: Rails Starter Template
date: 2020-10-05 19:18:31
author: Anuj Middha
category: Rails
tags:
- Ruby
- Rails
---

{% asset_img rails.png "Rails Starter Template'Rails Starter Template'" %}

Rails has support for powerful application templates that allow you to get up and running with new projects quickly and reliably. One common requirement we face is to setup a project with both API and web pages. Here, we'll discuss a template that we use to setup such a project.

#### Gems
We start by setting up the gems for our app. We use [Devise](https://github.com/heartcombo/devise) for authentication, and [devise-token-auth](https://github.com/lynndylanhurley/devise_token_auth) for API tokens. [Rolify](https://github.com/RolifyCommunity/rolify) is used for user roles.

We'll also setup Bootstrap and jQuery for the web.

Here's the complete list of our starter gems,
```
gem_group :development, :test do
  gem 'factory_bot_rails'
  gem 'rspec-rails'
end

gem 'database_cleaner'
gem 'devise'
gem 'devise_token_auth'
gem 'faker'
gem 'pundit'
gem 'rolify'
gem 'shoulda-matchers'
```

#### User Model
Next, we setup the user model. The first step is to install devise and devise-token-auth to generate their configs,
```
after_bundle do
  generate(:'devise:install')
  generate(:'devise_token_auth:install', 'User', 'auth')
  generate(:rolify, 'Role', 'User')
  ...
end
```

Next, run the migrations
```
rails_command('db:migrate')
```
and update the model file,
```
# app/models/user.rb
class User < ApplicationRecord
  rolify
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  include DeviseTokenAuth::Concerns::User

  validates :name, presence: true
  validates :email, presence: true
  validates :encrypted_password, presence: true

  after_create :assign_default_role

  private

  def assign_default_role
    add_role(:new_user) if roles.blank?
  end
end
```

#### Bootstrap and jQuery
We'll start by adding the required libraries to yarn,
```
after_bundle do
  ...
  run 'yarn add bootstrap jquery popper.js'
  ...
end
```

Next, we'll update the asset configuration files,
```
// config/webpack/environment.js
const { environment } = require('@rails/webpacker')

const webpack = require('webpack')
environment.plugins.prepend('Provide',
    new webpack.ProvidePlugin({
        Popper: ['popper.js', 'default']
    })
)

module.exports = environment
```
```
// 'app/assets/stylesheets/application.scss'
@import 'bootstrap';
```
```
// app/assets/stylesheets/bootstrap.scss
@import 'bootstrap/scss/bootstrap';
```
```
// app/javascript/packs/application.js

// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")

import JQuery from 'jquery';
window.$ = window.JQuery = JQuery;

import "bootstrap";

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)
```
And finally run `webpacker:install`
```
after_bundle do
  ...
  rails_command 'webpacker:install'
  ...
end
```

#### Base Controllers
Now lets setup the base controllers for Web and API. For the web controller, we'll use the `authenticate_user!` provided by devise
```
# app/controllers/web/base_controller.rb
class Admin::BaseController < ApplicationController
    before_action :authenticate_user!
end
```
and for the API controller, we'll use the `SetUserByToken` provided by devise_token_auth
```
# app/controllers/api/v1/base_controller.rb
class Api::V1::BaseController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  include Pundit
end
```

#### Sample Controllers
Now we can setup our sample controllers as below. In both of these, we can now access the currently logged in user as `current_user`
```
# app/controllers/web/dashboard_controller.rb
class Web::DashboardController < ApplicationController
  def index
  end
end

```
And for the API as
```
# app/controllers/api/v1/sample_controller.rb
class Api::V1::SampleController < Api::V1::BaseController
  def index
    render json: { success: true, email: current_user.email }, status: :ok
  end
end
```

#### Routes
The last thing to do is to setup the routes. We'll setup separate namespaces for web and API.
```
# config/routes.rb
Rails.application.routes.draw do
  authenticated :user do
    root to: 'web/dashboard#index', as: :authenticated_user_root
  end

  root to: redirect('/users/sign_in')

  devise_for :users

  namespace :web do
    get 'dashboard/index'
  end

  # API end points
  namespace :api do
    scope module: :v1 do
      mount_devise_token_auth_for 'User', at: 'auth'
      get 'sample/index'
    end
  end
end
```

And with that, we have setup a project with user roles and authentication, with support for both web and API end points. Here's a link to the complete [template file](https://gist.github.com/anujmiddha/d8d987b37466961fab1505de0029eaf6).
