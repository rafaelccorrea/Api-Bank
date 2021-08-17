import { Router } from 'express';
import { UserAccountController } from '../controllers';

const router = Router();

router.post('/account', UserAccountController.CreateAccount);
router.get('/account', UserAccountController.getAccountById);
router.get('/account', UserAccountController.getAllAccounts);
router.delete('/account', UserAccountController.deleteAccount);
router.put('/account', UserAccountController.UpdateAccount);

export default router;
