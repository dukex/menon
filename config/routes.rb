# frozen_string_literal: true

require 'resque/server'

Rails.application.routes.draw do
  # namespace :admin do
  #   namespace :courses do
  #     resources :lessons, only: [:index]
  #     resources :youtube_lessons, except: :index
  #   end

  #   resources :courses do
  #     get :import, on: :member
  #   end
  # end

  get '/sitemap', to: 'sitemap#index'
  get '/sitemap/:type/:page', to: 'sitemap#show'

  mount Resque::Server, at: '/jobs'

  resources :courses, path: '/', only: %i[index show] do
    collection do
      get '/language/:language', to: 'courses#index'
    end

    resources :lessons, module: :courses, only: :show
  end

  root to: 'courses#index'
end
