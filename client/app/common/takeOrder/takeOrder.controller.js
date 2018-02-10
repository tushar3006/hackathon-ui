  let _User;
  let _userDetails;
  let showLoader;
  let _dataAvailable;
  class TakeOrderController {
      constructor(STRINGS, User, Session, AppConstants, $state, Brand) {
          'ngInject';
          this.STRINGS = STRINGS;
          this.$state = $state;
          this.Session = Session;
          this.AppConstants = AppConstants;
          this.Brand = Brand;
          this._User = User;
          this._userDetails = {};
          this._dataAvailable = 0;
          this.name = 'takeOrder';
          this.userName = '';
          this.sideArrowImg = './app/assests/takeOrderAssets/Next.svg';
          this.showLoader = false;

      }

      onSelectPreviousLocation(l) {
          let location = {
              locationId: l.locationId,
              localityId: l.locality.localityId,
              address1: '',
              address2: l.locationName || l.locality.localityName,
              cityId: l.locality.areaLevel2.areaLevel2Id,
              addressType: '',
              city: l.locality.areaLevel2.areaLevel2Name,
              state: null,
              country: l.locality.areaLevel2.areaLevel1.countryId,
              zipcode: null,
              landmark: null,
              isDefault: 1,
              status: l.locality.areaLevel2.areaLevel1.status ? 'ACTIVE' : null

          }

          console.log(location, "******");
          console.log(l)
          console.log({ cityName: l.locality.areaLevel2.areaLevel2Name, cityId: l.locality.areaLevel2.areaLevel2Id }, "******");
          this.orderSelectedLocation = location;
          this.Session.setLocation(location);
          this.Session.setCity({ cityName: l.locality.areaLevel2.areaLevel2Name, cityId: l.locality.areaLevel2.areaLevel2Id })
      }
      getUserData(e) {

          if ((e.which == '13' || e.which == '1') && !this.showLoader) {
              this.showLoader = true;
              if ((new RegExp(/^[1-9][0-9]{9}$/g)).test(this.userName)) {
                  this.Session.setUserName(this.userName);
                  this._User.getAddressFromUserName(this.userName, this.Brand.getBrandId() ? this.Brand.getBrandId() : 691)
                      .then((orders) => {
                          this.showProceedLoader = false;
                          if (orders.status != 404)
                              this.Session.setUserDetails(orders);
                          else
                              this.Session.setUserDetails('');
                          this._userDetails = orders;
                          this._dataAvailable = 1;
                      }, (err) => {
                          this.showLoader = false;
                      })
                      .catch((err) => {
                          this.showLoader = false;
                      });
                  this.invalidError = '';
              } else {

                  this.invalidError = { message: 'Please Enter a Valid Phone no.', color: '#000000' }
              }
          }
      }

      resetDeliverySelection(data) {
          this.orderSelectedLocation = '';
      }

      $onInit() {
          this._dataAvailable = 0;
          this.tagLine = this.Brand.getTagline();
          this.heroImages = this.Brand.getHeroImages();
          this.initData = this.Session.getAllLocationData();
          this._userDetails = this.Session.getUserDetails();
      }

      onSelect(data) {
          this.resetDeliverySelection();
          this.close();

      }
  }

  export default TakeOrderController;
