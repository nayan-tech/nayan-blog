---
title: How to Upload files using Carrierwave Google Storage
date: 2020-10-31 00:11:11
author: Ashish Jajoria
categories:
- ["Ruby on Rails"]
tags: 
- backend
- rails
- ruby
- ror
- ruby on rails
- file upload
- carrierwave
- google storage
- Ashish Jajoria
---

We all must have got requirement for uploading files to Google Cloud Storage in our Rails Project for several purposes. Simplest way to do that is by using [carrierwave](https://github.com/carrierwaveuploader/carrierwave). But the carrierwave gem uses Fog to upload files to google cloud storage. But now we've a gem called [Carrierwave Google Storage](https://github.com/metaware/carrierwave-google-storage), which uses the official `google-cloud` gem by Google for Google Cloud Storage, instead of Fog.

![Carrierwave Google Storage](/blog/Ruby-on-Rails/how-to-upload-files-using-carrierwave-google-storage/upload.png)

## Lets start integrating file upload using Carrierwave Google Storage step by step:-

1: Add `carrierwave-google-storage` gem to your Gemfile

```ruby
gem 'carrierwave-google-storage'
```

2: Create `carrierwave.rb` to your `config/inititalizers`

```ruby
CarrierWave.configure do |config|
  config.storage                             = :gcloud
  config.gcloud_bucket                       = 'your-bucket-name'    # Better fetch this from environment variables
  config.gcloud_bucket_is_public             = true
  config.gcloud_authenticated_url_expiration = 600
  config.gcloud_content_disposition          = 'attachment'          # or you can skip this
  
  config.gcloud_attributes = {
    expires: 600
  }
  
  config.gcloud_credentials = {
    gcloud_project: 'gcp-project-name',                              # Better fetch this from environment variables
    gcloud_keyfile: 'path-to-gcp-keyfile.json'                       # Better fetch this from environment variables
  }
end
```

3: Run following command to create uploader at `app/uploaders/avatar_uploader.rb`

```shell
rails generate uploader Avatar
```

This will generate following file

```ruby
class AvatarUploader < CarrierWave::Uploader::Base
  def store_dir
    # Here you can specify your directory path to which your file should get uploaded
  end

  def extension_whitelist
    %w(jpg jpeg gif png) # Here you can whitelist the extensions you want to upload
  end
end
```

4: Add a `string` field to your model to mount the uploader by running following migration

```shell
rails g migration add_`string_field_name`_to_`your_model` `string_field_name`:string
rails db:migrate
```

5: Now open your model file and mount the uploader to newly added string field

```ruby
class User < ActiveRecord::Base
  mount_uploader :string_field_name, AvatarUploader
end
```

6: Now just save the file in model in following manner

```ruby
# If from api params
user = User.create(avatar: params[:image_file]) # This will create a user entry with uploaded file in avatar field

# If file is in file system
file = File.new('path/to/file')
user = User.create(avatar: file) # This will create a user entry with uploaded file in avatar field
```

7: To access uploaded file's url, use following method

```ruby
user.avatar.url # This will give you the URL of the uploaded file
```

## References:-

1. [CarrierWave](https://github.com/carrierwaveuploader/carrierwave)
2. [Carrierwave Google Storage](https://github.com/metaware/carrierwave-google-storage)

## Some good reads you may like:-

1. [Override Devise Auth Token Controllers](https://nayan.co/blog/Ruby-on-Rails/override-devise-auth-token-controllers/)
2. [Paytm Gateway Integration](https://nayan.co/blog/Ruby-on-Rails/paytm-gateway-integration/)
