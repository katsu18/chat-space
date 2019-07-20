class Api::MessagesController < ApplicationController
  
  def index
    
    @group = Group.find(params[:group_id]) 
    @messages = @group.messages.includes(:user).where('id > ?', params[:last_id]).where('user_id != ?  ',current_user.id ) #グループが所有しているメッセージの中から、params[:last_id]よりも大きいidがないかMessageから検索して、@messa。
  
    respond_to do |format| 
      format.html
      format.json
    end
  end
end

