---
title: The right way to make an Active Record ENUM in Ruby on Rails
date: 2020-11-12 23:26:05
author: Ashish Jajoria
categories:
- ["Ruby on Rails"]
tags:
- backend
- rails
- ruby
- ror
- ruby on rails
- enums
- Ashish Jajoria
---

When you have limited number or options and are trying to save one the option as some state of an Active Record then you may use [AASM - State machines for Ruby classes](https://github.com/aasm/aasm), but what if you are not saving a state and you the options for let's say: type of Active Record, In that case if you go with simple Strings then you might mess yourself up in the strings. Now on this condition the only thing that comes in mind is ENUM, They keep the options safe for you to use whenever you want.

![ENUMS](/blog/Ruby-on-Rails/making-enums-the-right-way-in-ruby-on-rails/enum_rails.png)

## Lets start understanding how to write a good ENUM step by step:-

## Starting with Basic ENUM

By default in the database the enum is stored as an integer, and when we query from the Active Record then it converts that integer to string and gives the expected status.

1: First we'll create a migration to add an integer column in the model to store the enum value

```ruby
class CreatePayoutAccruals < ActiveRecord::Migration[6.0]
    def up
        add_column :models_table_name, :your_type, :integer, default: 0
    end

    def down
        remove_column :models_table_name, :your_type
    end
end
```

p.s. Default value is not mandatory.

2: In your model add a basic enum in following manner

```ruby
class ModelName < ActiveRecord::Base
    enum your_type: [:type_1, :type_2]
end
```

That's it

Now if you create a new Active Record and see its `your_type` value then it'll be `0`, but when you print the `your_type` from Active Record in the Rails Console then it will convert `0` into `type_1`.

So, for our case

```ruby
DB_Value ENUM_Value
   0      :type_1
   1      :type_2
```

Now the problem here is that if we have to remove an ENUM value from the ENUM and add another one(let's say :type_3), then the `1` value will be referring to `:type_3`, which ideally we would not like to do.

For fixing this thing we can define the ENUM in following way as a HASH

## ENUM as HASH

Now update your previously created enum in following way

```ruby
class ModelName < ActiveRecord::Base
    enum your_type: {type_1: 0, type_2: 1}
end
```

Now 1 problem got resolved due to hash, i.e. if you remove and add new ENUM value then you can define its own value and that value will only refer to that ENUM for that column.

But still we have another problem, by looking at the database query results we won't be able to tell the actual type corresponding to that enum's integer value.

For that we'll do 3 things:

1. We'll create Database level ENUM data_type
2. This time We'll create ENUM's column as enum's data_type that we created in place of integer
3. We'll create Active Record ENUM as a HASH with meaning values

## Let's create the best ENUM

1: First, we'll create Database level ENUM data_type

```ruby
class CreatePayoutAccruals < ActiveRecord::Migration[6.0]
    def up
        execute <<-SQL
            CREATE TYPE your_type AS ENUM ('type_1', 'type_2');
        SQL
    end

    def down
        execute <<-SQL
            DROP TYPE your_type;
        SQL
    end
end
```

2: Then we'll create a migration to add an enum's data_type column in the model to store the enum value

```ruby
class CreatePayoutAccruals < ActiveRecord::Migration[6.0]
    def up
        add_column :models_table_name, :your_type, :your_type
    end

    def down
        remove_column :payout_accrual_logs, :your_type
    end
end
```

3: Lastly, In your model add a meaningful enum in following manner

```ruby
class ModelName < ActiveRecord::Base
    enum your_type: {type_1: 'type_1', type_2: 'type_2'}
end
```

That's it

Now we've everything sorted.

Last but not the least, add index to your column for better performance in queries.

## Points to remember

1. By default enum type in the Database is integer always
2. In Active Records enum value is string
3. Always use Hash for ENUMs
4. If your model have multiple enums with same values then you can prefix or suffix them by whatever you want by just adding `prefix: true OR prefix: xyz` or `suffix: true OR suffix: xyz`
5. ENUMs gives you Model scopes by default. For example in our case `ModelName.type_1`, this will fetch all the records with type_1 value

## References:-

1. [Ruby on Rails — How to Create Perfect Enum Easily!](https://medium.com/@moulayjam/ruby-on-rails-how-to-create-perfect-enum-easily-d8678e52488e)
2. [ActiveRecord::Enum](https://api.rubyonrails.org/v5.2.3/classes/ActiveRecord/Enum.html)
3. [Ruby on Rails - How to Create Perfect Enum in 5 Steps](https://naturaily.com/blog/ruby-on-rails-enum)

## Some good reads you may like:-

1. [Override Devise Auth Token Controllers](https://nayan.co/blog/Ruby-on-Rails/override-devise-auth-token-controllers/)
2. [Paytm Gateway Integration](https://nayan.co/blog/Ruby-on-Rails/paytm-gateway-integration/)
