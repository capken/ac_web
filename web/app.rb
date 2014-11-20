require 'sinatra'
require "sinatra/activerecord"
require 'sinatra/base'
require 'sinatra/json'
require 'digest/sha1' 
require 'hashids'

set :database, {adapter: "sqlite3", database: "sample.sqlite3"}

class Product < ActiveRecord::Base
end

before do
  #sleep 0.5
end

get '/' do
  redirect '/index.html' 
end

get '/products/:id' do
  product = Product.find_by_hash_id(params[:id]) || {}
  json product
end

get '/all_brands_models' do
  results = []
  Product.select(:hash_id, :brand, :model).each do |p|
    results << {
      :hash_id => p.hash_id,
      :brand => p.brand,
      :model => p.model
    }
  end
  json results
end

get '/products' do
  min_area, max_area = params['area'].split(':').map(&:to_i)
  min_height, max_height = params['height'].split(':').map(&:to_f)
  min_cycle, max_cycle = params['cycle'].split(':').map(&:to_f)

  avg_volume = (min_area*min_height + max_area*max_height)/2.0

  min_cadr = avg_volume*min_cycle
  max_cadr = avg_volume*max_cycle

  condition = "cadr_dust >= #{min_cadr} and cadr_dust <= #{max_cadr}"

  products = Product.where(condition.to_s).order('cadr_dust DESC')

  json products
end
