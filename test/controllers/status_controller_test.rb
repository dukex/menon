require 'test_helper'

class StatusControllerTest < ActionController::TestCase
  setup do
    @user = create(:user)
    @course = create(:course)
    @lesson = create(:lesson, course: @course)
    sign_in @user
  end

  test "should create lesson status" do
    assert_difference('LessonStatus.count') do
      post :create, course_id: @course, lesson_id: @lesson, status: { time: 1 }
    end
    assert_response :no_content
    assert_equal @lesson.status_for(@user).time, 1

    assert_no_difference('LessonStatus.count') do
      post :create, course_id: @course, lesson_id: @lesson, status: { time: 5 }
    end
    assert_response :no_content
    assert_equal @lesson.status_for(@user).time, 5
  end

  test "should finish lesson" do
    post :finish, course_id: @course, lesson_id: @lesson
    assert_response :no_content
    assert @lesson.status_for(@user).finished
  end
end
