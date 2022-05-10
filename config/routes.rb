# frozen_string_literal: true

require 'resque/server'

Rails.application.routes.draw do
  namespace :admin do
    resources :courses
  end

  mount Resque::Server, at: '/jobs'

  resources :courses
end
