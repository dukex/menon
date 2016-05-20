require 'rails_helper'

RSpec.describe Course, type: :model do
  it { should have_many(:lessons).order('position ASC').dependent(:destroy) }
  it { should have_many(:statuses).class_name('LessonStatus').through(:lessons) }
  it { should belong_to(:owner).class_name('User') }
  it { should validate_presence_of(:name) }

  let(:user) { create :user }
  let(:course) { create :course }
  let!(:lessons) { 10.times.map { create(:lesson, course_id: course.id) } }

  describe '#progress_for' do
    it 'returns the course progress for a user' do
      expect(course.progress_for(user)).to eql(0)
      lessons[0..4].map { |lesson| lesson.finish! user }
      expect(course.progress_for(user)).to eql(50)
      lessons[5..9].map { |lesson| lesson.finish! user }
      expect(course.progress_for(user)).to eql(100)
    end
  end

  describe '#import_from_youtube' do
    it 'imports course and lessons from youtube' do
      VCR.use_cassette('youtube-playlist', match_requests_on: [:path] ) do
        playlist_url = 'https://www.youtube.com/playlist?list=PLZ1LP8tToRpshG-CUxb4KnpOmbLlSZoa-'
        user = create :user

        course = Course.import_from_youtube playlist_url, user
        expect(course).to be_valid

        @course = Course.find course.id

        expect(@course.source_url).to eql(playlist_url)
        expect(@course.name).to eql('Test Ruby')
        expect(@course.description).to eql("Testing a ruby app")
        expect(@course.owner).to eql(user)

        expect(@course.lessons.count).to eql(1)
        lesson = @course.lessons.first
        expect(lesson.name).to eql('Simple Testing in Ruby Using Minitest')
        expect(lesson.duration).to eql(1100)
        expect(lesson.thumbnail_url).to eql('http://img.youtube.com/vi/kRFH0U5tbt8/hqdefault.jpg')
        expect(lesson.description).to eql("Writing tests for your app is kinda like ensuring that your car brakes will still work, even if you accidently change the language of your sat-nav to german.  You avoid nasty surprises. Today, Darren Jones is going to show you how to write tests in Ruby using MiniTest. Enjoy!")
        expect(lesson.published_at).to eql(Date.parse('Mon, 16 May 2016'))
        expect(lesson.provider_id).to eql('kRFH0U5tbt8')
        expect(lesson.position).to eql(0)
      end
    end

    it 'don\'t create course and lessons when error' do
      VCR.use_cassette('youtube-playlist-error') do
        playlist_url = 'https://www.youtube.com/playlist?list=PLSKbCQY095R4jp6PoFulCDLYIzzdbD1DI'

        @course = Course.import_from_youtube playlist_url, create(:user)

        expect(@course.lessons.count).to eql(0)
        expect(@course.valid?).to eql(false)
      end
    end
  end

  describe '#enrolled?' do
    it 'returns false' do
      expect(course.enrolled?(user)).to eql(false)
    end

    it 'returns true if user has a status for a course lesson' do
      lessons[0].status_for(user)
      expect(course.enrolled?(user)).to eql(true)
    end
  end

  describe '#thumbnail_url' do
    it 'returns the first lesson thumbnail_url' do
      expect(course.thumbnail_url).to eql(lessons.first.thumbnail_url)
    end

    it 'returns nil to course without lessons' do
      expect(create(:course).thumbnail_url).to eql(nil)
    end
  end
end
