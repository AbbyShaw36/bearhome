exports.methodNotAllowed = {type: "methodNotAllowed", discription: "Request method not allowed"};
exports.articleIdNotProvided = {type: "illegalArgument", description: "Article ID must provided"};
exports.galleryNameNotProvided = {type: "illegalArgument", description: "Gallery name must provided"};
exports.galleryIdNotProvided = {type: "illegalArgument", description: "Gallery ID must provided"};
exports.coverFileNotProvided = {type: "illegalArgument", description: "Gallery's cover file must provided"};
exports.dirAlreadyExists = {type: "duplicateEntry", discription: "Directory already exists"};
exports.internalServerErr = {type: "internalServerError", discription: "Internal server error"};
exports.galleryNotExists = { type: "ResourceNotFound", discription: "Gallery not exists"};