#import "AppDelegate.h"
#import "ZaloPaySDK/ZaloPaySDK.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTBridge.h> 
#import <React/RCTRootView.h> 
#import <UserNotifications/UserNotifications.h> 
#import <RNNotifications/RNNotifications.h> 

@implementation AppDelegate

// - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
// {
//   self.moduleName = @"mobile_shell";
//   // You can add your custom initial props in the dictionary below.
//   // They will be passed down to the ViewController used by React Native.
//   self.initialProps = @{};

//   return [super application:application didFinishLaunchingWithOptions:launchOptions];
// }

// - (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
// {
//   return [self getBundleURL];
// }

// - (NSURL *)getBundleURL
// {
// #if DEBUG
//   return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
// #else
//   return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
// #endif
// }

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    // Khởi tạo ZaloPaySDK với appID, uriScheme và environment
    [[ZaloPaySDK sharedInstance] initWithAppId:@"<appID>" uriScheme:@"<uriScheme>" environment:<ZPZPIEnvironment>];
    
    self.moduleName = @"mobile_shell";
    // You can add your custom initial props in the dictionary below.
    // They will be passed down to the ViewController used by React Native.
    self.initialProps = @{};
    
    return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
    // Gọi ZPDK để xử lý việc trao đổi dữ liệu giữa ZaloPay và ứng dụng
    return [[ZaloPaySDK sharedInstance] application:app openURL:url sourceApplication:@"vn.com.vng.zalopay" annotation:nil]; 
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge {
    return [self getBundleURL];
}

- (NSURL *)getBundleURL {
#if DEBUG
    return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@".expo/.virtual-metro-entry"];
#else
    return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}
 // Handle local notifications
- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification {
    [RNNotifications didReceiveLocalNotification:notification];
}

// Handle remote notifications
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
    [RNNotifications didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
    [RNNotifications didReceiveRemoteNotification:userInfo];
}

- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
    [RNNotifications didFailToRegisterForRemoteNotificationsWithError:error];
}

// Handle iOS 14+ user notifications
- (void)application:(UIApplication *)application didReceiveUserNotification:(UNNotification *)notification {
    [RNNotifications didReceiveNotificationExtensionRequest:[notification request]];
}

@end