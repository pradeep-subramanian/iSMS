var mongoose = require('mongoose');

var repository = function (modelName) {

    var self = this;

    self.Model = mongoose.model(modelName);

    self.findById = function (id, cb, subDocuments) {
        self.findOne({
            _id: id
        }, cb, subDocuments);
    };

    self.findOne =  function(params, cb, subDocuments) {
        var query = self.Model.findOne(params);

        if (subDocuments)
        {
            subDocuments.forEach(function(item) {
                query.populate(item);
            });
        }

        query.exec(function(err, entity) {
            if (!err && !entity){
                err = true;
            }

            cb(err, entity);
        });        
    };

    self.findAll = function (params, cb, subDocuments, lean) {
        var query = self.Model.find(params);

        if (lean) {
            query = self.Model.find(params).lean()
        }

        if (subDocuments) {
            subDocuments.forEach(function(item) {
                query.populate(item);
            });
        }

        query.exec(cb);
    };

    self.save = function (obj, cb) {
        var entity = new self.Model(obj);
        entity.save(function(err){
            cb(err);
        });
    };

    self.update = function (entity, cb) {
        self.findById(entity.id, function (err, oldEntity) {
            if (err) {
                cb(err);
            } else{
                oldEntity = entity;
                oldEntity.save(cb);
            }
        });
    };

    self.delete = function (entity, cb) {
        entity.remove(function (err) {
            cb(err);
        });
    };
};

repository.getModel = function (modelName) {
    return mongoose.model(modelName);
}

module.exports.Repository = repository;

module.exports.isValidId = function (id) {
    return mongoose.Types.ObjectId.isValid(id);
};