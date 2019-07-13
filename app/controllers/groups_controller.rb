class GroupsController < ApplicationController
  before_action :set_group, only: [:edit, :update]
    def index
    end
    def new
        @group = Group.new
        @group.users.push(current_user)
    end

    def show_last_message
      if (last_message = messages.last).present?
        if last_message.content?
        last_message.content
        else
          '画像が投稿されています'
        end
      else
        'まだメッセージはありません。'
      end
    end
  
    def create
      @group = Group.new(group_params)
      if @group.save
        redirect_to root_path, notice: 'グループを作成しました'
      else
        render :new
      end
    end
  
    def update
      if @group.update(group_params)
        redirect_to group_messages_path(@group), notice: 'グループを編集しました'
      else
        render :edit
      end
    end
  
    private
  
    def group_params
      params.require(:group).permit(:name, { :user_ids => [] })
    end
  
    def set_group
      binding.pry
      @group = Group.find(params[:id])
    end

end
