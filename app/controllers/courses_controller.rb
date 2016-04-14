class CoursesController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  before_action :set_public_course, only: :show
  before_action :set_course, only: [:edit, :update, :destroy, :import_from_youtube]

  def index
    @courses = Course.all
  end

  def show
  end

  def new
    @course = Course.new
  end

  def edit
  end

  def create
    @course = current_user.courses.create course_params
    respond_with @course
  end

  def update
    @course.update(course_params)
    respond_with @course
  end

  def destroy
    @course.destroy
    respond_with @course
  end

  def import_from_youtube
    playlist = Yt::Playlist.new url: params[:url]
    # TODO: course thumb playlist.thumbnail_url
    # TODO: course 'by' playlist.channel_title
    # TODO: course tags playlist.tags

    @course.lessons.map(&:destroy)

    lessons = playlist.playlist_items.map do |item|
      { name: item.title,
        description: item.description,
        thumbnail_url: item.thumbnail_url(:high),
        published_at: item.published_at,
        provider_id: item.video.id,
        position: item.position,
        duration: item.video.duration,
        course_id: @course.id }
    end

    YoutubeLesson.create lessons

    redirect_to @course
  end


  private
    def set_public_course
      @course = Course.find(params[:id])
    end

    def set_course
      @course = current_user.courses.find params[:id]
    end

    def course_params
      params.require(:course).permit(:name)
    end
end
