class PostsController < ApplicationController
    def index
        @posts = Post.all.order("created_at DESC")
        render :json => @posts
    end

    def show 
        @post = Post.find(params[:id])
        render :json => @post
    end

    def create
        
        @user = User.find_or_create_by(name: params[:name])
        #key is from schema value is from HTML
        @post = Post.new(post_params)
        @post.user = @user
        @post.save
        render :json => @post
    end

    def destroy
        @post = Post.find(params[:id])
        @post.destroy
    end

    def update
        @post = Post.find(params[:id])
        @post.update(post_params)
        render :json => @post
    end
    


    private

    def post_params
        params.require(:post).permit(:user_id, :name, :original)
    end



end
