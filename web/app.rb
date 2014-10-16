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

#get '/products' do
#  condition = {}
#  ['brand', 'model'].each do |attr|
#    condition[attr] = params[attr] if params[attr]
#  end
#
#  products = Product.where(condition)
#
#  json 'products' => products
#end

#get '/brands' do
#  brands = Product.select(:brand).distinct
#  json 'brands' => brands.map(&:brand)
#end
#
#get '/models' do
#  models = Product.select(:model).
#    where(brand: params['brand']).distinct
#  json 'brand' => params['brand'],
#    'models' => models.map(&:model)
#end

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
  mode = params['mode']
  room_area = params['room_area'].to_i
  room_height = params['room_height'].to_i

  case mode
#  when /search/
#    condition = "id = '#{params['id']}'"
  when /suggest/
    air_refresh_count = params['air_refresh_count'].to_i
    min_cadr = room_area * room_height * air_refresh_count
    condition = "cadr_dust >= #{min_cadr}"
  end

  products = Product.where(condition.to_s).
    order('cadr_dust').limit(20)

  json products
end
