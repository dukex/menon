# frozen_string_literal: true

require 'resque/server'

Rails.application.routes.draw do
  namespace :admin do
    namespace :courses do
      resources :lessons, only: [:index]
      resources :youtube_lessons, except: :index
    end

    resources :courses, only: %i[index show edit new destroy] do
      get :import, on: :member
    end
  end

  mount Resque::Server, at: '/jobs'

  resources :courses
end
