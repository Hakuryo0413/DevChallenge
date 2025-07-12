$redis = Redis.new(url: ENV["REDIS_URL"] || "redis://redis:6379/1")

begin
  $redis.ping # Trả về "PONG" nếu kết nối OK
  Rails.logger.info("✅ Redis connected successfully!")
rescue => e
  Rails.logger.error("❌ Redis connection failed: #{e.message}")
end
