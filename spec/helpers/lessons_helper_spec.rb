require 'rails_helper'

RSpec.describe LessonsHelper, type: :helper do
#       expect(helper.concat_strings("this","that")).to eq("this that")
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
      expect(helper.lesson_icon_for(nil, lesson, nil)).to eql('lesson')
    end
  end

  describe '#has_previous_lesson' do
    it 'returns true when has a previous lesson' do

    end

    it 'returns false when has not a previous lesson' do
    end
  end
end
