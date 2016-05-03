require 'test_helper'

class CourseTest < ActiveSupport::TestCase
  test "import course and lessons from youtube" do
    VCR.use_cassette("youtube-playlist", match_requests_on: [:path] ) do
      playlist_url = "https://www.youtube.com/playlist?list=PLSKbCQY095R4jp6PoFulCDLYIzzdbD1DI"
      user = create :user

      assert_difference('Course.count') do
        Course.import_from_youtube playlist_url, user
      end

      @course = Course.last
      assert_equal @course.source_url, playlist_url
      assert_equal @course.name, "Lecciones de Economía con Jesús Huerta de Soto"
      assert_equal @course.description, "Curso de economía impartido por el Profesor Huerta de Soto en la Universidad Rey Juan Carlos de Madrid.\nVídeo original: Instituto Juan de Mariana.\nEdición: Anarcocapitalista.com"
      assert_equal @course.thumbnail_url, "https://i.ytimg.com/vi/OLcBWiPLyzU/default.jpg"
      assert_equal @course.owner, user

      assert_equal @course.lessons.count, 123
      lesson = @course.lessons.first
      assert_equal lesson.name, 'Día 2 (vídeo 1) - La Función Empresarial: Introducción'
      assert_equal lesson.duration, 83
      assert_equal lesson.thumbnail_url, "https://i.ytimg.com/vi/OLcBWiPLyzU/hqdefault.jpg"
      assert_equal lesson.description, "Lecciones de Economía con Jesús Huerta de Soto.\nVer en contexto: http://www.anarcocapitalista.com/JHSLecciones2.htm#1"
      assert_equal lesson.published_at, Date.parse('Sat, 10 Jan 2015')
      assert_equal lesson.provider_id, 'OLcBWiPLyzU'
      assert_equal lesson.position, 0
    end
  end

  test "don't create course and lessons when error" do
    VCR.use_cassette("youtube-playlist-error") do
      playlist_url = "https://www.youtube.com/playlist?list=PLSKbCQY095R4jp6PoFulCDLYIzzdbD1DI"

      assert_no_difference('Course.count') do
        @course = Course.import_from_youtube playlist_url, create(:user)
      end

      assert_equal @course.lessons.count, 0
      assert_equal @course.valid?, false
    end
  end
end
