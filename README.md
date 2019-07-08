# README

# DB      

## users table
|Column|Type|Options|
|------|----|-------|
|name|string|null: false,index: true|
|email|string|null: false,|
|password|string|null: false,|
### Association
- has_many :groups, through: :user-group
- has_many :user-groups
- has_many :messages

## messages  table

|Column|Type|Options|
|------|----|-------|
|text|string|null: false|
|picturs|string||
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|


### Association
- belongs_to :user
- belongs_to :group

## user-groups  table

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :groups

## groups  table

|Column|Type|Options|
|------|----|-------|
|name|string|null: false,index: true|

### Association
- has_many :user, through: :user-group
- has_many :user-groups
- has_many :messages






