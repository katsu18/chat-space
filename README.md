# README

# DB      

## user table
|Column|Type|Options|
|------|----|-------|
|name|integer|null: false,|
|email|integer|null: false,|
|password|integer|null: false,|
### Association
- has_many :group through: :user-group
- has_many :picture
- has_many :message

## message  table

|Column|Type|Options|
|------|----|-------|
|text|integer||
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|
|pictuers_id|references|foreign_key: true|

### Association
- has_many :picture
- belongs_to :user
- belongs_to :group

## user-group  table

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## group  table

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|messages_id|references|foreign_key: true|

### Association
- has_many :user through: :user-group
- has_many :message

## group  picture

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|messages_id|references|foreign_key: true|

### Association
- belongs_to :user
- belongs_to :message






