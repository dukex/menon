require 'rails_helper'
require 'importer/youtube'

RSpec.describe Importer::Youtube do
  let(:source) { 'youtube.com/playlists/test' }
  let(:provider) { YT::Faker }
  let(:user) { create :user }

  describe '#import' do
    context 'with a new source url' do
      it 'creates a course' do
        importer = Importer::Youtube.new source, user.id, provider

        course = importer.import!

        expect(Course.count).to eql(1)
        expect(Course.first.source_url).to eql(source)
        expect(Course.first.owner_id).to eql(user.id)
        expect(Course.first.description).to eql('Test Description Course')
        expect(Course.first.name).to eql('Test Course')
        expect(Course.first).to eql(course)
      end

      it 'creates lessons' do
        importer = Importer::Youtube.new source, user.id, provider

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
        importer = Importer::Youtube.new source, user.id, provider
        allow(provider).to receive(:new).with(url: source).and_raise Yt::Error, {response_body: {error: {message: "an error"}}}.to_json

        course = importer.import!

        expect(course.errors[:base]).to eql(['an error'])
        expect(course.valid?).to be_falsy
      end

      it 'dont create lessons when course is invalid' do
        allow_any_instance_of(YT::Faker).to receive(:title).and_return(nil)
        importer = Importer::Youtube.new source, user.id, provider

        course = importer.import!

        expect(course.persisted?).to be_falsy
        expect(Lesson.count).to eql(0)
      end
    end

    context 'with an existent course using the source url' do
      before(:each) do
        @course = Importer::Youtube.new(source, user.id, provider).import!
      end

      it 'updates the existent course' do
        allow_any_instance_of(YT::Faker).to receive(:title).and_return('New Title')
        importer = Importer::Youtube.new source, user.id, provider

        course = importer.import!

        expect(Course.find(@course.id).name).to eql('New Title')
      end

      it 'dont create new lessons' do
        importer = Importer::Youtube.new source, user.id, provider

        importer.import!
        importer.import!

        expect(Lesson.count).to eql(1)
        expect(@course.reload.lessons).to eq(Lesson.all)
      end
    end
  end

  describe '.update!' do
    it 'updates the course' do
      course = Importer::Youtube.new(source, user.id, provider).import!
      allow_any_instance_of(YT::Faker).to receive(:title).and_return('New Title')

      Importer::Youtube.update! course.id, provider

      expect(Course.find(course.id).name).to eql('New Title')
    end
  end
end
