class SitemapController < ApplicationController
  def index
    map = XmlSitemap::Map.new('www.menon.courses') do |m|
      m.add '/'

      Course.includes(:lessons).all.map do |course|
        m.add course_path(course), updated: course.updated_at

        course.lessons.all.map do |lesson|
          m.add course_lesson_path(course, lesson),
            updated: lesson.updated_at,
            video_thumbnail_location: lesson.thumbnail_url,
            video_title: lesson.name,
            video_description: lesson.description,
            video_player_location: "http://www.youtube.com/v/#{lesson.provider_id}?fs=1&hl=en_US&rel=0&hd=1&autoplay=1",
            video_duration: lesson.duration,
            video_publication_date: lesson.published_at
        end
      end
    end.render

    render xml: map
  end
end
