import { Router } from 'express';
import { UserAccountController } from '../controllers';

const router = Router();

router.post('/account', UserAccountController.CreateAccount);
router.get('/account/:id', UserAccountController.getAccountById);
router.get('/account', UserAccountController.getAllAccounts);
router.delete('/account/:id', UserAccountController.deleteAccount);
router.put('/account/:id', UserAccountController.UpdateAccount);

export default router;
