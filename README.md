# dot-money-expense

## How to run

### 1. Clone repo
### 2. cd dot-money-expense
### 3. npm install
### 4. npx react-native run-android
### 5. npm start


## Test Pengetahuan

#### 1.Pengalaman React Native
##### Untuk React secara global pengelaman saya sekitar 1 tahun, namun untuk spesifik React Native kurang dari 1 tahun

#### 2.Library yang sering digunakan
##### a. Redux: Untuk global state management
##### b. Axios: Untuk melakukan http Request ke REST API
##### c. Moment: Untuk mempermudah ketika memproses Tanggal dan Waktu
##### d. Lodash: Untuk mempermudah ketika ingin (transform / sort / search) String ,Array atau Object

#### 3.Penerapan clean code
##### Di tempat saya bekerja sekarang belum ada penerapan clean code yang spesifik, tetapi saya pernah mempelejari tentang SOLID Principle

#### 4.Tantangan terbesar 
##### Navigasi: Ketika user dapat mengakses kembali screen yang seharusnya tidak bisa di akses lagi, seperti (Splash, Login) solusinya dengan merancang navigasi dengan baik, seperti kapan untuk menggunakan SwitchNavigator dan StackNavigator, dan juga dengan handle BackButton di screen yang di inginkan

#### 5. Performa dan Keamanan
##### Performa : Menggunakan PNG atau webP daripada SVG untuk asset nya, menggunakan FlatList daripada ListView, Cache network image
##### Kemanan : Tidak menyimpan API KEY di aplikasi, Hati hati ketika menyimpan data sensitive di AsyncStorage
