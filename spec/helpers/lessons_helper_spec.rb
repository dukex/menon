require 'rails_helper'

RSpec.describe LessonsHelper, type: :helper do
  describe "#lesson_status_class_for" do
    let(:user) { create :user }
    let(:lesson) { create :lesson }

    it 'returns lesson' do
      expect(helper.lesson_status_class_for(user, lesson, create(:lesson))).to eql('lesson')
    end

    it 'returns finished too when lesson is finished' do
      lesson.finish!(user)
      expect(helper.lesson_status_class_for(user, lesson, create(:lesson))).to eql('lesson finished')
    end

    it 'returns current too when lesson is the current' do
      expect(helper.lesson_status_class_for(user, lesson, lesson)).to eql('lesson current')
    end

    it 'returns lesson when current lesson is nil' do
      expect(helper.lesson_status_class_for(user, lesson, nil)).to eql('lesson')
    end

    it 'returns lesson when user is nil' do
      expect(helper.lesson_status_class_for(nil, lesson, nil)).to eql('lesson')
    end
  end

  describe '#lesson_icon_for' do
    let(:user) { create :user }
    let(:lesson) { create :lesson }

    it 'returns circle' do
      expect(helper.lesson_icon_for(user, lesson, create(:lesson))).to eql('circle')
    end

    it 'returns check-circle-o when lesson is finished' do
      lesson.finish!(user)
      expect(helper.lesson_icon_for(user, lesson, create(:lesson))).to eql('check-circle-o')
    end

    it 'returns dot-circle-o when lesson is the current' do
      expect(helper.lesson_icon_for(user, lesson, lesson)).to eql('dot-circle-o')
    end

    it 'returns circle when current lesson is nil' do
      expect(helper.lesson_icon_for(user, lesson, nil)).to eql('circle')
    end

    it 'returns lesson when user is nil' do
      expect(helper.lesson_icon_for(nil, lesson, nil)).to eql('circle')
    end
  end

  describe '#has_previous_lesson' do
    it 'returns true when has a previous lesson' do
      course = create(:course)

      first_lesson = create(:lesson, course: course)
      second_lesson = create(:lesson, course: course)

      expect(helper.has_previous_lesson(course, first_lesson)).to be_falsy
      expect(helper.has_previous_lesson(course, second_lesson)).to be_truthy
    end
  end

  describe '#has_next_lesson' do
    it 'returns true when has a next lesson' do
      course = create(:course)

      first_lesson = create(:lesson, course: course)
      second_lesson = create(:lesson, course: course)

      expect(helper.has_next_lesson(course, first_lesson)).to be_truthy
      expect(helper.has_next_lesson(course, second_lesson)).to be_falsy
    end
  end

  describe '#lesson_title_size_class' do
    it 'returns the class col-md-6 when has previous or next, else col-md-9' do
      course = create(:course)

      first_lesson = create(:lesson, course: course)
      second_lesson = create(:lesson, course: course)
      third_lesson = create(:lesson, course: course)

      expect(helper.lesson_title_size_class(course, first_lesson)).to eql('col-md-9')
      expect(helper.lesson_title_size_class(course, second_lesson)).to eql('col-md-6')
      expect(helper.lesson_title_size_class(course, third_lesson)).to eql('col-md-9')
    end
  end
end
