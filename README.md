# RN-camera-amplitude-conflict

## Only for iOS

## Problem: when turn on Amplitude Session Replay and then open Camera, App will CRdSOm13mOBa42iTaTyfyEWBdKcGdPxPtLFBXuHR8XHb33YNYaP

### Text of Error

*** Terminating app due to uncaught exception 'NSInternalInconsistencyException', reason: 'An instance 0x300c83ed0 of class AVCaptureVideoPreviewLayer was deallocated while key value observers were still registered with it. Current observation info: <NSKeyValueObservationInfo 0x300338500> (
<NSKeyValueObservance 0x300d156e0: Observer: 0x30006c620, Key path: contents, Options: <New: NO, Old: NO, Prior: NO> Context: 0x0, Property: 0x300d15c80>
<NSKeyValueObservance 0x300d14180: Observer: 0x30006c620, Key path: filters, Options: <New: NO, Old: NO, Prior: NO> Context: 0x0, Property: 0x300d15b30>
<NSKeyValueObservance 0x300d15590: Observer: 0x30006c620, Key path: contentsMultiplyColor, Options: <New: NO, Old: NO, Prior: NO> Context: 0x0, Property: 0x300d15860>
)'
*** First throw call stack:
(0x19b6087cc 0x1988db2e4 0x19a2b1310 0x21fe9cfb0 0x1988c9afc 0x1988c8f3c 0x1988c8edc 0x21fe8e310 0x223ad9860 0x223ad9570 0x223ad9030 0x223ad8fcc 0x223ad8e90 0x223ad9584 0x223ad9030 0x223ad8fcc 0x10103271c 0x10103a5e8 0x10103b360 0x1010485f0 0x101047c00 0x223adfc7c 0x223adc488)
DevLauncher tries to handle uncaught exception: An instance 0x300c83ed0 of class AVCaptureVideoPreviewLayer was deallocated while key value observers were still registered with it. Current observation info: <NSKeyValueObservationInfo 0x300338500> (
<NSKeyValueObservance 0x300d156e0: Observer: 0x30006c620, Key path: contents, Options: <New: NO, Old: NO, Prior: NO> Context: 0x0, Property: 0x300d15c80>
<NSKeyValueObservance 0x300d14180: Observer: 0x30006c620, Key path: filters, Options: <New: NO, Old: NO, Prior: NO> Context: 0x0, Property: 0x300d15b30>
<NSKeyValueObservance 0x300d15590: Observer: 0x30006c620, Key path: contentsMultiplyColor, Options: <New: NO, Old: NO, Prior: NO> Context: 0x0, Property: 0x300d15860>
)
Stack Trace: (
    "0   CoreFoundation                      0x000000019b6087d8 1532D3D8-9B3B-3F2F-B35F-55A20DDF411B + 534488",
    "1   libobjc.A.dylib                     0x00000001988db2e4 objc_exception_throw + 88",
    "2   Foundation                          0x000000019a2b1310 6D0212CC-3B9E-32C9-BE20-72989CE3ACB8 + 951056",
    "3   CameraUI                            0x000000021fe9cfb0 991C8615-87DA-3936-98F8-B5C1BE5E1EA3 + 1916848",
    "4   libobjc.A.dylib                     0x00000001988c9afc 1608892E-67DB-3F94-9FC2-91492B86C95F + 23292",
    "5   libobjc.A.dylib                     0x00000001988c8f3c objc_destructInstance + 80",
    "6   libobjc.A.dylib                     0x00000001988c8edc _objc_rootDealloc + 80",
    "7   CameraUI                            0x000000021fe8e310 991C8615-87DA-3936-98F8-B5C1BE5E1EA3 + 1856272",
    "8   libsystem_blocks.dylib              0x0000000223ad9860 D1AF7F13-234F-3876-9979-9F0D976697D6 + 10336",
    "9   libsystem_blocks.dylib              0x0000000223ad957
nw_proxy_resolver_create_parsed_array [C12.1 proxy pac] Evaluation error: kCFErrorDomainCFNetwork: 308
nw_proxy_resolver_create_parsed_array [C13.1 proxy pac] Evaluation error: kCFErrorDomainCFNetwork: 308
nw_proxy_resolver_create_parsed_array [C14.1 proxy pac] Evaluation error: kCFErrorDomainCFNetwork: 308
Task <B3E0A097-033C-49CC-9A0A-6B67903DA523>.<10> HTTP load failed, 770/0 bytes (error code: -1005 [4:-4])
libc++abi: terminating due to uncaught exception of type NSException
Task <B3E0A097-033C-49CC-9A0A-6B67903DA523>.<10> finished with error [-1005] Error Domain=NSURLErrorDomain Code=-1005 "The network connection was lost." UserInfo={NSErrorFailingURLStringKey=http://192.168.1.17:8081/node_modules/expo-router/hot, NSErrorFailingURLKey=http://192.168.1.17:8081/node_modules/expo-router/hot, _NSURLErrorRelatedURLSessionTaskErrorKey=(
    "LocalWebSocketTask <B3E0A097-033C-49CC-9A0A-6B67903DA523>.<10>"
), _NSURLErrorFailingURLSessionTaskErrorKey=LocalWebSocketTask <B3E0A097-033C-49CC-9A0A-6B67903DA523>.<10>, NSLocalizedDescription=The network connection was lost.}
