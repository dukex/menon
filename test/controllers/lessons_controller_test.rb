require 'test_helper'

class LessonsControllerTest < ActionController::TestCase
  setup do
    @lesson = create(:lesson)
  end

  test "should show lesson" do
    get :show, id: @lesson, course_id: @lesson.course_id
    assert_response :success
  end

  test "should destroy lesson" do
    assert_difference('Lesson.count', -1) do
      delete :destroy, id: @lesson, course_id: @lesson.course_id
    end

    assert_redirected_to @lesson.course
  end
end
