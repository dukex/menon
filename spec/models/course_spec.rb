require 'rails_helper'

RSpec.describe Course, type: :model do
  it { should have_many(:lessons).order('position ASC').dependent(:destroy) }
  it { should have_many(:statuses).class_name('LessonStatus').through(:lessons) }
  it { should belong_to(:owner).class_name('User') }
  it { should validate_presence_of(:name) }

  describe '#progress_for' do 
    it 'returns the course progress for a user' do 
      course = create(:course)
      user = create(:user)
      lessons = 10.times.map { create(:lesson, course_id: course.id) }

      expect(course.progress_for(user)).to eql(0)
      lessons[0..4].map(&:id).each { |id| LessonStatus.create! lesson_id: id, user_id: user.id, finished: true }
      expect(course.progress_for(user)).to eql(50)
      lessons[5..9].map(&:id).each { |id| LessonStatus.create! lesson_id: id, user_id: user.id, finished: true }
      expect(course.progress_for(user)).to eql(100)
    end
  end

  describe '#import_from_youtube' do 
    xit 'imports course and lessons from youtube' do
      VCR.use_cassette('youtube-playlist', match_requests_on: [:path] ) do
        playlist_url = 'https://www.youtube.com/playlist?list=PLSKbCQY095R4jp6PoFulCDLYIzzdbD1DI'
        user = create :user

        Course.import_from_youtube playlist_url, user

        @course = Course.last
        expect(@course.source_url).to eql(playlist_url)
        expect(@course.name).to eql('Lecciones de Economía con Jesús Huerta de Soto')
        expect(@course.description).to eql("Curso de economía impartido por el Profesor Huerta de Soto en la Universidad Rey Juan Carlos de Madrid.\nVídeo original: Instituto Juan de Mariana.\nEdición: Anarcocapitalista.com")
        expect(@course.thumbnail_url).to eql('https://i.ytimg.com/vi/OLcBWiPLyzU/default.jpg')
        expect(@course.owner).to eql(user)

        expect(@course.lessons.count).to eql(123)
        lesson = @course.lessons.first
        expect(lesson.name).to eql('Día 2 (vídeo 1) - La Función Empresarial: Introducción')
        expect(lesson.duration).to eql(83)
        expect(lesson.thumbnail_url).to eql('https://i.ytimg.com/vi/OLcBWiPLyzU/hqdefault.jpg')
        expect(lesson.description).to eql("Lecciones de Economía con Jesús Huerta de Soto.\nVer en contexto: http://www.anarcocapitalista.com/JHSLecciones2.htm#1")
        expect(lesson.published_at).to eql(Date.parse('Sat, 10 Jan 2015'))
        expect(lesson.provider_id).to eql('OLcBWiPLyzU')
        expect(lesson.position).to eql(0)
      end
    end

    xit 'don\'t create course and lessons when error' do
      VCR.use_cassette('youtube-playlist-error') do
        playlist_url = 'https://www.youtube.com/playlist?list=PLSKbCQY095R4jp6PoFulCDLYIzzdbD1DI'

        @course = Course.import_from_youtube playlist_url, create(:user)

        expect(@course.lessons.count).to eql(0)
        expect(@course.valid?).to eql(false)
      end
    end
  end
end
