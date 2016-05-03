class Course < ActiveRecord::Base
  has_many :lessons, -> { order('position ASC') }, dependent: :destroy

  belongs_to :owner, class_name: "User"

  validates :name, presence: true

  def self.import_from_youtube(url, user)
    course = self.new owner: user
    playlist = Yt::Playlist.new url: url

    begin
      course.assign_attributes name: playlist.title,
        description: playlist.description,
        thumbnail_url: playlist.thumbnail_url,
        source_url: url

      lessons = playlist.playlist_items.map do |item|
        YoutubeLesson.new name: item.title,
          description: item.description,
          thumbnail_url: item.thumbnail_url(:high),
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
  end
end
