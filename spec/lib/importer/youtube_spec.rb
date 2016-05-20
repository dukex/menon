require 'rails_helper'
require 'importer/youtube'

RSpec.describe Importer::Youtube do
  describe '#import' do
    let(:source) { 'youtube.com/playlists/test' }
    let(:provider) { double }
    let(:user) { create :user }
    let(:importer) { Importer::Youtube.new source, user.id, provider }

    before(:each) do
      allow(provider).to receive(:new).with(url: source).and_return provider
      allow(provider).to receive(:title).and_return 'Test Course'
      allow(provider).to receive(:description).and_return 'Test Description Course'
      allow(provider).to receive(:playlist_items).and_return []
    end

    it 'creates a course' do
      course = importer.import!
      expect(Course.count).to eql(1)
      expect(Course.first.source_url).to eql(source)
      expect(Course.first.owner_id).to eql(user.id)
      expect(Course.first.description).to eql('Test Description Course')
      expect(Course.first.name).to eql('Test Course')
      expect(Course.first).to eql(course)
    end

    it 'creates lessons' do
      allow(provider).to receive(:playlist_items).and_return [double({
        title: 'Lesson 1',
        description: 'Description 1',
        video: double(id: 'xyy2', duration: 300),
        position: 1,
        published_at: Time.new(2015,1,1)
      })]

      importer.import!

      lesson = Course.first.lessons.first
      expect(lesson.name).to eql('Lesson 1')
      expect(lesson.description).to eql('Description 1')
      expect(lesson.provider_id).to eql('xyy2')
      expect(lesson.position).to eql(1)
      expect(lesson.duration).to eql(300)
      expect(lesson.thumbnail_url).to eql("http://img.youtube.com/vi/xyy2/hqdefault.jpg")
      expect(lesson.published_at).to eql(Date.new(2015,1,1))
    end

    it 'rescue from YT errors' do
      allow(provider).to receive(:new).with(url: source).and_raise Yt::Error, {response_body: {error: {message: "an error"}}}.to_json

      course = importer.import!
      expect(course.errors.get(:base)).to eql(['an error'])
      expect(course.valid?).to be_falsy
    end
  end
end
