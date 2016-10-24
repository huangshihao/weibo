/**
 * Created by howe on 2016/10/25.
 */
const KEY_FOLLOWINGS = 'user:followings:'
const KEY_FOLLOWERS = 'user:followers:'

class RelationModel{
    constructor(redis){
        this.redis = redis
    }
    //userid 关注 touserid
    fllow (userId, toUserId){
        return this.redis.multi([
            ['ZADD', KEY_FOLLOWINGS + userId, Date.now(), toUserId],
            ['ZADD', KEY_FOLLOWERS + toUserId, Date.now(), userId]
        ]).exec()
    }
    unfollow (userId, toUserId){
        if(userId === toUserId){
            return
        }
        return this.redis.multi([
            ['ZREM',KEY_FOLLOWINGS + userId, toUserId],
            ['ZREM',KEY_FOLLOWERS + toUserId, userId]
        ])
    }

    async isFollowing(userId, toUserId){
        if(userId === toUserId){
            return true
        }
        const rank = await this.redis.zrank(KEY_FOLLOWINGS + userId, toUserId)

        return rank !== null;
    }

    getFollowingsCount (userId){
        return this.redis.zcard(KEY_FOLLOWINGS + userId)
    }
    getFollowersCount (userId){
        return this.redis.zcard(KEY_FOLLOWERS + userId)
    }

    listFollowers (userId, pageNum = 1, pageSize = 100){
        return this.redis.zrevrange(KEY_FOLLOWERS + user,(pageNum - 1)*pageSize, pageNum*pageSize)
    }
    listFollowIngs (userId, pageNum = 1, pageSize = 100){
        return this.redis.zrevrange(KEY_FOLLOWINGS + user,(pageNum - 1)*pageSize, pageNum*pageSize)
    }
}

module.exports = RelationModel