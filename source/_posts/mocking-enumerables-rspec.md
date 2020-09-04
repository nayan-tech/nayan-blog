---
title: Mocking Enumerables in Rspec
date: 2020-09-01 11:56:17
author: Anuj Middha
category: Rails
tags:
- Ruby
- Rails
- rspec
- Mocking
---

{% asset_img mock-rails.jpg "Mocking in Rails'Mocking in Rails'" %}

Rails puts some really powerful mocking libraries at our disposal. As long as your models are backed by ActiveRecord, [ActiveRecord Fixtures](https://api.rubyonrails.org/v3.2/classes/ActiveRecord/Fixtures.html) and [Factory Bot](https://github.com/thoughtbot/factory_bot) are two very good libraries for mocking. More often than not, these cover the use cases for most applications. But when your models are not backed by ActiveRecord, there's an excellent test-double framework for rspec, called [RSpec Mocks](https://github.com/rspec/rspec-mocks) that you can use.

#### Basic Mocking with RSpec Mocks

Basic mocking using RSpec Mocks is straight forward. Initialize the mock object as below

```
@mock_post = double('post')
```
and then
```
allow(@mock_post).to receive(:title) { 'sample title' }
```

### Mocking a chain of methods

For mocking a chain of methods, there are two options.

Lets say that the `Post` object has a method `author`, that returns another object of class `Author`. The `Author` class has multiple methods, including `name` and `image`

- If your code only ever calls the `name` method for the post's author, you can easily setup this mock object as
```
allow(@mock_post).to receive_message_chain(:author, :name) { 'Sample Author' }
```

- If you need a more complex mocking, you can have 2 mock objects
```
@mock_author = double('author')
allow(@mock_author).to receive(:name) { 'Sample Author' }
allow(@mock_author).to receive(:image) { 'https://sample.image' }

allow(@mock_post).to receive(:author) { @mock_author }
```

### Mocking Enumerables

In my specific project, I had a model that responded to `each`, and also had other methods that needed mocking, `total`, `skip`, `limit` etc. My initial instinct was that I could just do something like
```
posts = double('post')
allow(posts).to receive(:each) { posts_list }
```

But unfortunately that doesn't work, because each expects a block and yields each of the list item to the block. Fortunately, RSpec Mocks has a method [`and_yields`](https://github.com/rspec/rspec-mocks/blob/main/lib/rspec/mocks/message_expectation.rb#L169) that lets us set up just what we need.

Continuing with the above example, lets say we need to have 10 mock posts. We can set it up as,

```
posts_list = []
10.times do |index|
  post = double('post', title: "post_#{index}")
  posts_list << post
end

posts = double('post', total: posts_list.size, skip: 0, limit: posts_list.size)
iterator = allow(posts).to receive(:each)
posts_list.each do |post|
  iterator.and_yield(post)
end
```

At this point, the `posts` mock object responds to the `each` iterator and returns the 10 mock post objects. It also responds to the `total`, `skip` and `limit` methods correctly.

Hope this helps.

p.s. Nayan is a platform that offers high precision services for traffic monitoring and road safety. Check out our [website](https://nayan.co).