require 'test_helper'

class CoursesControllerTest < ActionController::TestCase
  setup do
    @user = create(:user)
    @request.env["devise.mapping"] = Devise.mappings[:user]
  end

  test "should get index" do
    10.times.each { create(:course) }
    get :index
    assert_response :success
    assert_not_nil assigns(:courses)
    assert_equal assigns(:courses).size, 10
  end

  test "should not get new without login" do
    get :new
    assert_redirected_to user_session_path
  end

  test "should get new" do
    sign_in @user
    get :new
    assert_response :success
  end

  test "should not create course without login" do
    post :create, course: { name: "Test" }
    assert_redirected_to user_session_path
  end

  test "should create course" do
    sign_in @user

    assert_difference('Course.count') do
      post :create, course: { name: "Test" }
    end

    assert_redirected_to course_path(assigns(:course))
    assert_equal Course.first.name, 'Test'
  end

  test "should not create course with name" do
    sign_in @user

    assert_no_difference('Course.count') do
      post :create, course: { name: nil }
    end

    assert_template :new
  end

  test "should show course" do
    get :show, id: create(:course).id
    assert_response :success
  end

  test "should not get edit without login" do
    get :edit, id: create(:course).id
    assert_redirected_to user_session_path
  end

  test "should only get edit to my courses" do
    sign_in @user
    assert_raises(ActiveRecord::RecordNotFound) do
      get :edit, id: create(:course).id
    end
  end

  test "should get edit course" do
    get :show, id: create(:course, owner: @user).id
    assert_response :success
  end

  test "should not update without login" do
    @course = create(:course)
    patch :update, id: @course, course: { name: "Abc" }
    assert_redirected_to user_session_path
  end

  test "should only update my courses" do
    sign_in @user
    @course = create(:course)
    assert_raises(ActiveRecord::RecordNotFound) do
      patch :update, id: @course, course: { name: "Abc" }
    end
  end

  test "should update course" do
    sign_in @user
    @course = create(:course, owner: @user)
    patch :update, id: @course, course: { name: 'Abc' }
    assert_redirected_to course_path(assigns(:course))
    @course.reload
    assert_equal @course.name, 'Abc'
  end

  test "should not destroy course without login" do
    @course = create(:course)
    delete :destroy, id: @course
    assert_redirected_to user_session_path
  end

  test "should only destroy my courses" do
    sign_in @user
    @course = create(:course)
    assert_raises(ActiveRecord::RecordNotFound) do
      delete :destroy, id: @course
    end
  end

  test "should destroy course" do
    sign_in @user
    @course = create(:course, owner: @user)
    assert_difference('Course.count', -1) do
      delete :destroy, id: @course
    end
  end

  test "should import youtube playlist" do
    sign_in @user
    # @course = create(:course, owner: @user)


    VCR.use_cassette("youtube-playlist", match_requests_on: :path) do
      playlist_url = "https://www.youtube.com/playlist?list=PLSKbCQY095R4jp6PoFulCDLYIzzdbD1DI"

      assert_difference('Course.count') do
        post :import_from_youtube, url: playlist_url
      end

      assert_equal @course.owner, @user

      @lesson = @course.lessons.first
      assert_equal @lesson.name, 'Día 2 (vídeo 1) - La Función Empresarial: Introducción'
      assert_equal @lesson.duration, 83
      assert_equal @lesson.thumbnail_url, "https://i.ytimg.com/vi/OLcBWiPLyzU/hqdefault.jpg"

      assert_equal @lesson.description, "Lecciones de Economía con Jesús Huerta de Soto.\nVer en contexto: http://www.anarcocapitalista.com/JHSLecciones2.htm#1"
      assert_equal @lesson.published_at, Date.parse('Sat, 10 Jan 2015')
      assert_equal @lesson.provider_id, 'OLcBWiPLyzU'
      assert_equal @lesson.position, 0

      assert_redirected_to course_path(@course)
    end
  end
end
