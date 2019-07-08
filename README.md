# README

＃DB      

##user table
|Column|Type|Options|
|------|----|-------|
|name|integer|null: false,|
|email|integer|null: false,|

## members table

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user