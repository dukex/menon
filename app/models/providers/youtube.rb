module Providers
  class Youtube
    attr_reader :course, :playlist

    def initialize(course:)
      @course = course
      @playlist = youtube.new url: course.source_url
    end

    def import!
      import_course!
      import_lessons!
    rescue Yt::Errors::Forbidden => e
      @course.retry_soon!
    end

    private

    def import_course!
      puts "- Importing '#{playlist.title}'"

      course.name = playlist.title
      course.description = playlist.description.gsub("\n", '<br />')
      course.thumbnail_url = playlist.thumbnail_url(:high)
      course.status ||= :created

      course.creator_name = playlist.channel_title
      course.creator_url = "https://youtube.com/channel/#{playlist.channel_id}"

      course.save!
    end

    def import_lessons!
      puts "-- Found #{playlist.playlist_items.count} episodes"

      playlist.playlist_items.map do |item|
        puts "-- - Importing #{item.title}"
        Courses::YoutubeLesson.find_or_create_by(provider_id: item.video.id, course_id: course.id) do |lesson|
          lesson.name = item.title
          lesson.description = item.description
          lesson.thumbnail_url = item.thumbnail_url(:high)
          lesson.published_at = item.published_at
          lesson.position = item.position
          lesson.duration = item.video.duration
        end
      end
    end

    def youtube
      Yt::Playlist
    end
  end
end
