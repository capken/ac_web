require 'sinatra'
require "sinatra/activerecord"
require 'sinatra/base'
require 'sinatra/json'
require 'digest/sha1' 

set :database, {adapter: "sqlite3", database: "sample.sqlite3"}

class Product < ActiveRecord::Base
end

get '/' do
  redirect '/index.html' 
end

get '/products/:id' do
  product = Product.find(params[:id]) || {}
  json product
end

get '/all_brands_models' do
  results = []
  Product.select(:id, :brand, :model).each do |p|
    results << {
      :id => p.id,
      :brand => p.brand,
      :model => p.model
    }
  end
  json results
end

get '/products' do
  min_area, max_area = params['area'].split(':').map(&:to_i)
  min_height, max_height = params['height'].split(':').map(&:to_f)
  cycle = params['cycle'].to_i

  min_cadr = min_area * min_height * cycle
  max_cadr = max_area * max_height * cycle

  condition = "cadr_dust >= #{min_cadr} and cadr_dust <= #{max_cadr}"

  products = Product.where(condition.to_s).sample(15)

  json products
end
