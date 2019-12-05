/**
 * 钱包相关接口
 */
import dkAxios from '@/jslibs/dk-axios';

export const applyWithdrawal = data =>
  dkAxios({
    url: 'Withdrawal/Apply',
    method: 'POST',
    data,
  });

export const getWithdrawalConfig = data =>
  dkAxios({
    url: 'Withdrawal/Config',
    method: 'POST',
    data,
  });


export const getDeal = data =>
  dkAxios({
    url: 'User/deal',
    method: 'POST',
    data,
  });

export const getPendingDeal = data =>
  dkAxios({
    url: 'User/pendingDeal',
    method: 'POST',
    data,
  });
