
seeds_file = File.join(File.dirname(__FILE__), 'seeds.json')

def score_of(product)
  score = 0
  if product.cadr_dust
    score += product.cadr_dust/product.power_max if product.power_max
    score += product.cadr_dust/product.noise_max if product.noise_max
    if product.price
      score += (product.cadr_dust/product.price) * 
        (product.made_in.to_s =~ /中国/ ? 80 : 100)
    end
  end
  return score
end

def image_of(image_strs)
  if image_strs 
    images = image_strs.split ','
    return images[rand(images.size)]
  end
end

Product.delete_all

hashids = Hashids.new("airpal", 6)

count = 0
File.readlines(seeds_file).each do |input|
  record = JSON[input]

  product = Product.new do |p|
    p.brand = record['brand']
    p.model = record['model']
    p.cadr_dust = record['cadr_dust']
    p.aham_verified = record['aham_verified']
    p.power_max = record['power_max']
    p.noise_max = record['noise_max']
    p.made_in = record['made_in']
    p.weight = record['weight']
    p.price = record['price']
    p.air_volume = record['air_volume']
    p.fan_speed_levels = record['fan_speed_levels']
    p.sleep_mode = record['sleep_mode']
    p.timing = record['timing']
    p.quality_meter = record['quality_meter']
    p.filter_reminder = record['filter_reminder']
    p.remote_control = record['remote_control']
    p.reviews_link = record['reviews_link']
    p.etao_link = record['etao_link']
    p.score = score_of p
    p.image_url = image_of(record['image'])
  end

  product.save

  product.hash_id = hashids.encode product.id
  product.save

  count += 1
end

puts "#{count} records are imported into DB."
