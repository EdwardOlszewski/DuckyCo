import asyncHandler from 'express-async-handler'

// @desc    Upload an image
// @route   POST /api/upload
// @access  Private/Admin
const uploadImage = asyncHandler(async (req, res) => {
  res.status(201).json('file Uploaded')
})

export { uploadImage }
