Rails.application.routes.draw do
  get 'log/view'

  root 'log#view'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
