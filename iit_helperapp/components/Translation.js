import { AsyncStorage, InteractionManager, Platform } from 'react-native';
let Strings = {
  "enUS": {
    lang: 'العربية',
    FontFamily: 'coconnextarabic-light',
    Home: 'Home',
    Next: 'Next',
    Skip: 'Skip',
    StartWithUs: 'Start',
    Marks: 'Marks',
    ActivitiesAndDuties: 'Activities And Homework',
    TrackTheTours: 'Track The Tours',
    ExamDates: 'Exam Dates',
    Absences: 'Absences',
    WeeklyPlans: 'Weekly Plans',
    StudentBehavior: 'Student Behaviour',
    CommunicationWithTheSchool: 'Contact The School',
    WorkPapers: 'Working Sheets',
    SchoolCalendar: 'School Calendar',
    SchoolCafeteria: 'School Cafeteria',
    SignIn: 'Sign In',
    PhoneNumber: 'Phone Number',
    ConfirmPhoneNumber: 'Confirm Phone Number',
    ConfirmationCode: 'Confirmation Code',
    EnterConfirmationCode: 'Enter Confirmation Code',
    ConfirmationCodeSentBySMS: 'Confirmation Code Sent By SMS',
    Homeworks: 'Homeworks',
    Activities: 'Activities',
    Today: 'Today',
    Tomorrow: 'Tomorrow',
    Messages: 'Messages',
    TotalPurchase: 'Total Purchase',
    PaymentFromWallet: 'Payment From Wallet',
    Sciences: 'Sciences',
    Mathematics: 'Mathematics',
    ArabicLanguage: 'Arabic Language',
    EnglishLanguage: 'English Language',
    Computer: 'Computer',
    SocialStudies: 'SocialStudies',
    Sunday: 'Sunday',
    Monday: 'Monday',
    Tuesday: 'Tuesday',
    Wednesday: 'Wednesday',
    Thursday: 'Thursday',
    WelcomeToSchoolCafeteria: 'Welcome To School Cafeteria',
    CreateStudentCart: 'Create The Student Cart',
    AddToCart: 'Add To Cart',
    Sandwich: 'Sandwich',
    Juice: 'Juice',
    Chips: 'Chips',
    Chocalate: 'Chocalate',
    Biscuit: 'Biscuit',
    Candies: 'Candies',
    ContinuePurchase: 'Continue Purchase',
    EndPurchase: 'End Purchase',
    TotalSummation: 'Total Summation',
    CartTotal: 'Cart Total',
    PaymentMadeFromWallet: 'The Payment Was Made From The Wallet',

    //<---- errors strings start ---->//
    errorLoginMsg: "Please Enter Correct Email and password",
    errorLoginMsg2: "Please Enter Correct Phone ",
    matchPassError: 'The Password Not Matching',
    error: 'Error !',
    ErrorEmpty: "Please fill in the field",
    ErrorNoEmail: 'Please enter your email address',
    nameError: 'Please enter your name',
    ErrorWrongEmail: 'Please enter a valid email address',
    ErrorWrongPassword: 'The password should be at least 6 letters',
    ErrorNoPassword: 'Please enter your Password',
    imageError: 'Please Upload All Required Images',
    ageError: 'Please Enter Age',
    ErrorEmptyFamilyName: 'Please enter family name',
    ErrorEmptyFirstName: 'Please enter first name',
    vehicleTypeError: 'Please enter the vehicle type',
    vehicleIdError: 'Please enter the vehicle number',
    ErrorPhone: 'Please enter phone number',
    ErrorPhoneFormat: 'Please enter valid phone number',
    ErrorEmptyDob: 'Please enter date of birth',
    ErrorEmptyGender: 'Please select gender',
    passwordConfirmEmpty: 'password not match',
    ErrorEmptyName: 'Please enter your name',
    errorRegester: 'Phone number already exists ',
    inVaildCode: 'الرجاء إدخال الرمز الصحيح',
    //<---- errors strings end ---->//

    sectionStart: "Beginning of the semester",
    attendance: 'Number of days of attendance',
    absence: "number of absence's Day",
    absencePermission: 'Absence permission',
    viewDetails: 'View details',
    date: 'Date',
    reason: 'Reason Of Absence',
    save: 'Save',
    close: 'Close',
    firstMonth: 'First Month',
    secondMonth: "Second Month",
    final: "Final",
    YourMessageHasBeenSent: 'Your Message Sas Been Sent',
    ContactUsMSGDescription: 'Your Message Will Be Reviewed Immediately And We Will Contact You When Needed',
    PreviousServices : 'Previous Services',
    ServicesINeededHelpWith: 'Services I Needed Help With',
    HelpWasDone: 'Help Was Done',
    Underway: 'Underway',
    Waiting: 'Waiting',
    ServicesIVolunteered: 'Services I Volunteered',
    CancelVolunteering: 'Cancel Volunteering',
    UserName: 'User Name',
    CancelVolunteerServiceMSG: 'Are you sure you want to cancel the volunteer service?',
    CancelOrderMSG: 'Are you sure you want to cancel the help order?',
    ServiceConfirmMSG: 'Did you receive help well?',
    yes: 'Yes',
    No: 'No',
    Cancel: 'Cancel',
    WaitForApproval: 'Wait For Approval',
    YourRequestHasBeenSent: 'Your Request Has Been Sent',
    YouWillBeAssistedByAlNashama: 'You Will Be Assisted By Al-Nashama',
    PreviousVolunteers: 'Previous Volunteers',
    
    Services:'Services close to you',
    TeachersContact: 'Contact The Teacher',
    startChat: 'Start Chat',
    MyAccount: 'My Account',
    Notification: 'Notification',
    contactUs: 'Contact Us',
    share: 'Share Application',
    download: 'Download',
    morning: 'Morning Tour',
    evening: 'Evening tour',
    busNo: 'Bus Number',
    teacherName: 'Teacher Name',
    trackBus: "Track The Bus",
    deliveryLocation: "Delivery location",
    name: 'Name',
    email: 'E-mail',
    message: 'Message',
    send: 'Send',
    EditProfile: 'Edit Profile',
    locAsk: 'Please activate location to use the application',
    confirm: 'confirm',
    retry: 'Retry',
    volunteerNoteArea: 'write the subjects you want to teach',
    requiredField: 'This field is required',
    volunteerCheckboxLable: 'I agree to provide the service for free',
    fullName: 'Full Name',
    fullNameError: 'please enter full name',
    nationalNumber: 'National number',
    nationalNumberError: 'please enter national number',
    selectVolunteerType: 'Choose the service area you would like to volunteer',
    onlineEducation: 'Online Education',
    otherServices: 'Other Services',
    carNum: 'Car Number',
    volunteerFormNote: 'Note: We need this information in order to obtain permission from official authorities',
    volunteerNote2Area: 'Write the service you will provide',
    carNumError: 'please enter car number',
    VolunteerForm: 'I want to volunteer',
    retry: 'Retry',
    selectServiceType: 'Choose the service area you need help with',
    serviceDescPlaceholder: 'Discribe the service you need',
    needHelpFormNote: 'The volunteer group [Nashama] will provide you with free service',
    firstGrade: 'First Grade',
    secondGrade: 'Second Grade',
    thirdGrade: 'Third Grade',
    fourthGrade: 'Fourth Grade',
    fifthGrade: 'Fifth Grade',
    sixthGrade: 'Sixth Grade',
    seventhGrade: 'Seventh Grade',
    eighthGrade: 'Eighth Grade',
    ninthGrade: 'Ninth Grade',
    tenthGrade: 'Tenth Grade',
    eleventhGrade: 'Eleventh Grade',
    tawjihi: 'tawjihi',
    class: 'Class',
    cancel : 'Cancel',
    selectdClassError : 'select class please',
    sentSuccesfully : 'Sent Succesfully',
    helpNow : 'Help Now'
  },
  ar: {
    Services:'خدمات قريبه منك',
    VolunteerForm: 'أرغب بالتطوع',
    helpNow : 'المساعدة الآن',
    volunteerNoteArea: 'اذكر المواد التي ترغب بتدريسها',
    requiredField: 'هذا الحقل مطلوب',
    volunteerCheckboxLable: 'أوافق على تقديم الخدمة مجانا',
    fullName: 'الاسم الرباعي',
    fullNameError: 'الرجاء ادخال الاسم الرباعي',
    nationalNumber: 'الرقم الوطني',
    nationalNumberError: 'الرجاء ادخال الرقم الوطني',
    selectVolunteerType: 'اختر مجال الخدمة التي ترغب التطوع بها',
    onlineEducation: 'التعليم عن بعد',
    otherServices: 'خدمات أخرى',
    carNum: 'رقم السيارة',
    volunteerFormNote: 'ملاحظة : نحتاج هذه المعلومات من أجل الحصول على تصريح من الجهات الرسمية',
    volunteerNote2Area: 'اذكر الخدمات التي ستقدمها',
    carNumError: 'الرجاء ادخال رقم السيارة',

    retry: 'اعادة المحاولة',
    confirm: 'تأكيد',


    FontFamily: 'coconnextarabic-light',
    Home: 'الرئيسية',
    Next: 'التالي',
    Skip: 'تخطي',
    StartWithUs: 'إبدأ معنا',
    Marks: 'العلامات',
    ActivitiesAndDuties: 'الأنشطة والواجبات',
    TrackTheTours: 'تتبع الجولات',
    ExamDates: 'مواعيد الإمتحانات',
    Absences: 'الغيابات',
    WeeklyPlans: 'الخطة الأسبوعية',
    StudentBehavior: 'سلوك الطالب',
    CommunicationWithTheSchool: 'التواصل مع المدرسة',
    WorkPapers: 'أوراق العمل',
    SchoolCalendar: 'التقويم المدرسي',
    SchoolCafeteria: 'المقصف المدرسي',
    SignIn: 'تسجيل الدخول',
    PhoneNumber: 'رقم الهاتف',
    ConfirmPhoneNumber: 'ثبت رقم الهاتف',
    ConfirmationCode: 'رمز التأكيد',
    EnterConfirmationCode: 'ادخل رمز التأكيد',
    ConfirmationCodeSentBySMS: 'رمز التأكيد الذي تم إرساله برسالة قصيرة',
    Homeworks: 'الواجبات',
    Activities: 'الأنشطة',
    Today: 'اليوم',
    Tomorrow: 'غداً',
    Messages: 'الرسائل',
    TotalPurchase: 'مجموع الشراء',
    PaymentFromWallet: 'الدفع من المحفظة',
    Sciences: 'العلوم',
    Mathematics: 'الرياضيات',
    ArabicLanguage: 'اللغة العربية',
    EnglishLanguage: 'اللغة الانجليزية',
    Computer: 'الحاسوب',
    SocialStudies: 'اجتماعيات',
    Sunday: 'الأحد',
    Monday: 'الإثنين',
    Tuesday: 'الثلاثاء',
    Wednesday: 'الأربعاء',
    Thursday: 'الخميس',
    WelcomeToSchoolCafeteria: 'اهلاً بك في مقصف المدرسة',
    CreateStudentCart: 'قم بإنشاء سلة الشراء الخاصة بالطالب',
    AddToCart: 'إضافة الى سلته',
    Sandwich: 'ساندويشات',
    Juice: 'العصائر',
    Chips: 'شيبس',
    Chocalate: 'شوكلاته',
    Biscuit: 'بسكويت',
    Candies: 'توفي',
    ContinuePurchase: 'متابعة الشراء',
    EndPurchase: 'انهاء الشراء',
    TotalSummation: 'المجموع الكلي',
    CartTotal: 'مجموع سلة المشتريات',
    PaymentMadeFromWallet: 'تمت عملية الدفع من المحفظة',

    //<---- errors strings start ---->//
    errorRegester: 'رقم الهاتف موجود مسبقا ',
    imageError: "الرجاء رفع جميع الصور المطلوبة",
    error: 'حدث خطأ !',
    errorLoginMsg: 'الرجاء ادخال رقم هاتف و بريد الالكتروني صحيح ',
    errorLoginMsg2: 'الرجاء ادخال رقم هاتف  صحيح',
    ErrorEmpty: "يرجى ادخال الحقل ",
    ErrorNoEmail: 'الرجاء ادخال بريد الكتروني',
    locAsk: 'قم بتفعيل خاصية تحديد الموقع لإستخدام التطبيق ',
    ageError: 'الرجاء ادخال العمر',
    vehicleTypeError: 'الرجاء أدخال نوع المركبة',
    nameError: 'الرجاء ادخال الأسم ',
    ErrorWrongEmail: 'الرجاء ادخال بريد الكتروني صحيح',
    ErrorWrongPassword: 'يجب أن تكون كلمة السر على الأقل 6 أحرف',
    ErrorNoPassword: 'الرجاء ادخال كلمة السر',
    ErrorEmptyFamilyName: 'الرجاء ادخال اسم العائلة',
    ErrorEmptyFirstName: 'الرجاء ادخال الاسم الأول',
    ErrorPhone: 'الرجاء ادخال رقم الجوال',
    ErrorPhoneFormat: 'الرجاء ادخال رقم جوال صحيح',
    ErrorEmptyDob: 'الرجاء ادخال تاريخ الميلاد',
    vehicleIdError: 'الرجاء أدخال رقم المركبة',
    ErrorEmptyGender: 'الرجاء اختيار الجنس',
    passwordConfirmEmpty: 'كلمة السر غير متطابقة',
    ErrorEmptyName: 'الرجاء ادخال الاسم',
    matchPassError: 'كلمة السر غير متطابقة',
    inVaildCode: 'الرجاء إدخال الرمز الصحيح',
    //<---- errors strings end ---->//

    sectionStart: "بداية الفصل الدراسي ",
    attendance: 'عدد أيام الحضور',
    absence: 'عدد أيام الغياب',
    absencePermission: 'إذن غياب',
    viewDetails: 'مشاهدة التفاصيل',

    sectionStart: "بداية الفصل الدراسي ",
    attendance: 'عدد أيام الحضور',
    absence: 'عدد أيام الغياب',
    absencePermission: 'إذن غياب',
    viewDetails: 'مشاهدة التفاصيل',
    date: 'التاريخ',
    reason: 'سبب الغياب',
    save: 'حفظ',
    close: 'إلغاء',
    firstMonth: 'الشهر الأول',
    secondMonth: "الشهر الثاني",
    final: "نهائي",
    YourMessageHasBeenSent: 'تم ارسال رسالتك',
    ContactUsMSGDescription: 'سيتم مراجعة رسالتك في الحال و التواصل بك عند الحاجة',
    PreviousServices : 'خدمات سابقة',
    ServicesINeededHelpWith: 'خدمات احتجت للمساعدة بها',
    HelpWasDone: 'تمت المساعدة',
    Underway: 'قيد التنفيذ',
    Waiting: 'بالإنتظار',
    ServicesIVolunteered: 'خدمات قمت بالتطوع بها',
    CancelVolunteering: 'الغاء التطوع',
    UserName: 'اسم المستخدم',
    CancelVolunteerServiceMSG: 'هل انت متأكد من الغاء التطوع؟',
    CancelOrderMSG:'هل انت متأكد من الغاء طلب المساعدة؟',
    ServiceConfirmMSG: 'هل تلقيت المساعدة بشكل جيد؟',
    yes: 'نعم',
    no: 'لا',
    Cancel: 'الغاء',
    WaitForApproval: 'انتظر الموافقة الأمنية',
    YourRequestHasBeenSent: 'تم ارسال طلبك',
    YouWillBeAssistedByAlNashama: 'سيتم مساعدتك من قبل النشامى',
    PreviousVolunteers: 'تطوعات سابقة',

    TeachersContact: 'تواصل مع المعلمين',
    startChat: 'إبدأ المحادثة',
    MyAccount: 'حسابي',
    Notification: 'الاشعارات',
    contactUs: 'تواصل بنا',
    lang: 'English',
    share: 'شارك التطبيق',
    download: 'تنزيل',
    morning: 'الجولة صباحية',
    evening: 'الجولة المسائية',
    busNo: 'رقم الباص',
    teacherName: 'اسم المشرفة',
    trackBus: "تتبع الباص",
    deliveryLocation: "موقع التوصيل",
    name: 'الاسم',
    email: 'البريد الالكتروني',
    message: 'الرسالة',
    send: 'ارسال',

    EditProfile: 'تعديل الملف الشخصي',
    
    volunteerNoteArea: 'اذكر المواد التي ترغب بتدريسها',
    requiredField: 'هذا الحقل مطلوب',
    volunteerCheckboxLable: 'أوافق على تقديم الخدمة مجانا',
    fullName: 'الاسم الرباعي',
    fullNameError: 'الرجاء ادخال الاسم الرباعي',
    nationalNumber: 'الرقم الوطني',
    nationalNumberError: 'الرجاء ادخال الرقم الوطني',
    selectVolunteerType: 'اختر مجال الخدمة التي ترغب التطوع بها',
    onlineEducation: 'التعليم عن بعد',
    otherServices: 'خدمات أخرى',
    carNum: 'رقم السيارة',
    volunteerFormNote: 'ملاحظة : نحتاج هذه المعلومات من أجل الحصول على تصريح من الجهات الرسمية',
    volunteerNote2Area: 'اذكر الخدمات التي ستقدمها',
    carNumError: 'الرجاء ادخال رقم السيارة',


    selectServiceType: 'اختر مجال الخدمة التي تحتاج إلى مساعده بها',
    serviceDescPlaceholder: 'صف الخدمة التي تريدها',
    needHelpFormNote: 'سيقوم النشامى المتطوعين بتقديم الخدمة لك مجاناً',
    firstGrade: 'الصف الأول',
    secondGrade: 'الصف الثاني',
    thirdGrade: 'الصف الثالث',
    fourthGrade: 'الصف الرابع',
    fifthGrade: 'الصف الخامس',
    sixthGrade: 'الصف السادس',
    seventhGrade: 'الصف السابع',
    eighthGrade: 'الصف الثامن',
    ninthGrade: 'الصف التاسع',
    tenthGrade: 'الصف العاشر',
    eleventhGrade: 'الصف الحادي عشر',
    tawjihi: 'التوجيهي',
    class: 'الصف',
    cancel : 'إلغاء',
    selectdClassError : 'الرجاء اختار الصف',
    sentSuccesfully : 'تم الارسال بنجاح'

  }
};

module.exports = Strings
