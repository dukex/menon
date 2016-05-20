class Course < ActiveRecord::Base
  extend FriendlyId
  has_many :lessons, -> { order('position ASC') }, dependent: :destroy
  has_many :statuses, class_name: 'LessonStatus', through: :lessons

  belongs_to :owner, class_name: "User"

  validates :name, presence: true

  friendly_id :name, use: [:slugged, :finders]

  def self.import_from_youtube(url, user)
    # TODO: change user params just to id
    course = self.new owner: user
    playlist = Yt::Playlist.new url: url

    course.assign_attributes name: playlist.title,
      description: playlist.description,
      source_url: url

    lessons = playlist.playlist_items.map do |item|
      YoutubeLesson.new name: item.title,
        description: item.description,
        thumbnail_url:  "http://img.youtube.com/vi/#{item.video.id}/hqdefault.jpg",
        published_at: item.published_at,
        provider_id: item.video.id,
        position: item.position,
        duration: item.video.duration,
        course_id: course.id
    end

    course.lessons = lessons
    course.save
  rescue Yt::Error => error
    course.errors.add(:base, error.kind["message"])
  ensure
    return course
  end

  def thumbnail_url
    lessons.first && lessons.first.thumbnail_url
  end

  def progress_for(user)
    (statuses.finished.where(user_id: user.id).count*100) / lessons.count
  end

  def enrolled?(user)
    return statuses.where(user_id: user.id).exists?
  end
end
