import { SaveSecretCommand } from 'application/save_secret/save-secret-command'
import express from 'express'
import { body } from 'express-validator'
import container from 'src/container'
import { InvalidSecretError } from 'domain/secret/errors/invalid-secret-error'
import { InvalidMessages } from './validation-values'
import { UpdateLikeCommand } from 'src/application/update_likes/update-likes-command'

const router = express.Router()

router.post('/insert',
  [
    body('age')
      .isEmpty().withMessage(InvalidMessages.NOT_EMPTY)
      .isInt({ min: 12, max: 99 }).withMessage(InvalidMessages.INVALID_AGE),
    body('gender')
      .isEmpty().withMessage(InvalidMessages.NOT_EMPTY)
      .isIn(['man', 'woman', 'other']).withMessage(InvalidMessages.INVALID_GENDER),
    body('secret')
      .isEmpty().withMessage(InvalidMessages.NOT_EMPTY)
      .isString().withMessage(InvalidMessages.IS_STRING)
      .isLength({ max: 420 }).withMessage(`${InvalidMessages.MAX_CHAR} 420`)
      .matches(/^[a-zA-Z0-9\s!¡?¿,.:'"¡"'.\sáéíóúÁÉÍÓÚñÑ]+$/)
      .withMessage(InvalidMessages.INVALID_SECRET),
    body('likes')
      .isEmpty().withMessage(InvalidMessages.NOT_EMPTY)
      .custom((value) => value === 0 && typeof value === 'number')
      .isNumeric().withMessage(InvalidMessages.IS_NUMBER)
      .withMessage(InvalidMessages.INVALID_LIKES),
    body('anonName')
      .isString().withMessage(InvalidMessages.IS_STRING)
      .isLength({ max: 10 }).withMessage(`${InvalidMessages.MAX_CHAR} 10`)
      .withMessage(InvalidMessages.INVALID_ANONNAME),
  ],
  async (req: express.Request, res: express.Response) => {
    const { age, gender, secret, likes, anonName } = req.body

    try {
      const command = new SaveSecretCommand({ age, gender, secret, likes, anonName })
      const saveSecret = container.resolve('saveSecret')
      const response = await saveSecret.execute(command)

      res.status(200).send(response)
    } catch (error: unknown | undefined) {
      if (error instanceof InvalidSecretError) {
        res.status(409).json({message: error.message})
      }
      res.status(500).send({ message: 'An error occurred while processing your request.' })
    }
  }
)

router.post('/updateLike',
  async (req: express.Request, res: express.Response) => {
    const { id, likes, isLike } = req.body

    try {
      const command = new UpdateLikeCommand({ id, likes, isLike })
      const updateLike = container.resolve('updateLike')
      const response = await updateLike.execute(command)

      res.status(200).send(response)
    } catch (error: unknown | undefined) {
      if (error instanceof InvalidSecretError) {
        res.status(409).json({message: error.message})
      }
      res.status(500).send({ message: 'An error occurred while processing your request.' })
      console.log(error)
    }
  }
)

export { router }

