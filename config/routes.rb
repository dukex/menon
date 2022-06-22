# frozen_string_literal: true

require 'resque/server'

Rails.application.routes.draw do
  get '/sitemap', to: 'sitemap#index'
  get '/sitemap/:type/:page', to: 'sitemap#show'
  get '/sitemap/:page-:type', to: 'sitemap#show'

  mount Resque::Server, at: '/jobs'

  resources :courses, path: '/', only: %i[index show] do
    resources :lessons, module: :courses, only: :show
    collection do
      resources :search, module: :courses, only: :index do
        get '/:q', to: 'search#index', on: :collection, as: :query
        get '/tag/:tag', to: 'search#index', on: :collection, as: :tag
      end
    end
  end

  root to: 'courses#index'
end
