class Notification {
  notificationSystem = null;

  init = notificationRef => {
    this.notificationSystem = notificationRef;
  };

  showMessage({
    message = '',
    level = 'success',
    action,
    autoDismiss = 10,
    position = 'br',
  }) {
    autoDismiss = action ? LIFE_TIME : autoDismiss;
    this.notificationSystem.addNotification({
      message,
      level,
      position,
      autoDismiss,
      action,
    });
  }
}

export default new Notification();
