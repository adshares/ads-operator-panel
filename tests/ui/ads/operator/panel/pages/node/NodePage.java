package ui.ads.operator.panel.pages.node;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;

import java.util.Objects;

public class NodePage {

//  Assert
  @FindBy(xpath = "//*[contains(text(), 'Id')]")                                                                        private WebElement IdAssert;
  @FindBy(xpath = "//*[contains(text(), 'Accounts')]")                                                                  private WebElement AccountsAssert;
  @FindBy(xpath = "//*[contains(text(), 'Messages')]")                                                                  private WebElement MessagesAssert;
  @FindBy(xpath = "//*[contains(text(), 'Balance')]")                                                                   private WebElement BalanceAssert;
  @FindBy(xpath = "//*[contains(text(), 'Status')]")                                                                    private WebElement StatusAssert;
  @FindBy(xpath = "//*[contains(text(), 'Ip')]")                                                                        private WebElement IpAssert;
  @FindBy(xpath = "//*[contains(text(), 'Public Key')]")                                                                private WebElement PublicKeyAssert;
  @FindBy(xpath = "//*[contains(text(), 'Last Message Time')]")                                                         private WebElement LastMessageTimeAssert;
  @FindBy(xpath = "//*[contains(text(), 'Failed to fetch')]")                                                           private WebElement FailedToFetchAssert;
  @FindBy(xpath = "//*[contains(@href,'sort=id&order=desc')]")                                                          private WebElement SortIdOrderDescAssert;
  @FindBy(xpath = "//*[contains(@href,'sort=id&order=asc')]")                                                           private WebElement SortIdOrderAscAssert;
  //Button
  @FindBy(xpath = "//*[contains(text(), 'Table')]")                                                                     private WebElement Table;
  @FindBy(xpath = "//*[contains(text(), 'Code')]")                                                                      private WebElement Code;
//  @FindBy(xpath = "//div//*[contains(text(), 'Copy')]")                                                                 private WebElement Copy;
  @FindBy(xpath = "//section//div[2]//button")                                                                          private WebElement Copy;
  @FindBy(xpath = "//*[contains(text(), 'Previous')]")                                                                  private WebElement Previous;
  @FindBy(xpath = "//*[contains(text(), 'Next')]")                                                                      private WebElement Next;
  @FindBy(xpath = "//*[contains(text(), 'Nodes')]")                                                                     private WebElement Nodes;
  //  Accounts
  @FindBy(xpath = "//section//th[1]")                                                                                   private WebElement AccountIdAssert;
  @FindBy(xpath = "//section//th[2]")                                                                                   private WebElement AccountBalanceAssert;
  @FindBy(xpath = "//section//th[3]")                                                                                   private WebElement AccountStatusAssert;
  @FindBy(xpath = "//section//th[4]")                                                                                   private WebElement AccountPublicKeyAssert;

  @FindBy(xpath = "//*[td][1]//div//div//*//*")                                                                         private WebElement ikon_status;

    private WebDriver driver;
  private WebDriverWait wait;

  public NodePage(WebDriver driver) {
    this.driver = driver;
    wait = new WebDriverWait(driver, 30);
    PageFactory.initElements(driver, this);
  }

  public void detailedDataNode () {
    wait.until(ExpectedConditions.visibilityOf(IdAssert));
    Assert.assertEquals("Id", IdAssert.getText());
    System.out.println("Assert - "+IdAssert.getText());
    wait.until(ExpectedConditions.visibilityOf(AccountsAssert));
    Assert.assertEquals("Accounts", AccountsAssert.getText());
    System.out.println("Assert - "+AccountsAssert.getText());
    wait.until(ExpectedConditions.visibilityOf(MessagesAssert));
    Assert.assertEquals("Messages", MessagesAssert.getText());
    System.out.println("Assert - "+MessagesAssert.getText());
    wait.until(ExpectedConditions.visibilityOf(BalanceAssert));
    Assert.assertEquals("Balance", BalanceAssert.getText());
    System.out.println("Assert - "+BalanceAssert.getText());
    wait.until(ExpectedConditions.visibilityOf(StatusAssert));
    Assert.assertEquals("Status", StatusAssert.getText());
    System.out.println("Assert - "+StatusAssert.getText());
    wait.until(ExpectedConditions.visibilityOf(IpAssert));
    Assert.assertEquals("Ip", IpAssert.getText());
    System.out.println("Assert - "+IpAssert.getText());
    wait.until(ExpectedConditions.visibilityOf(PublicKeyAssert));
    Assert.assertEquals("Public Key", PublicKeyAssert.getText());
    System.out.println("Assert - "+PublicKeyAssert.getText());
    wait.until(ExpectedConditions.visibilityOf(LastMessageTimeAssert));
    Assert.assertEquals("Last Message Time", LastMessageTimeAssert.getText());
    System.out.println("Assert - "+LastMessageTimeAssert.getText());

    wait.until(ExpectedConditions.visibilityOf(Copy));
    Copy.click();
    System.out.println("Click - Copy");
    wait.until(ExpectedConditions.visibilityOf(Code));
    Code.click();
    System.out.println("Click - Code");
    wait.until(ExpectedConditions.visibilityOf(Copy));
    Copy.click();
    System.out.println("Click - Copy");
  }

  public void sortingSccountsInNode() {
    wait.until(ExpectedConditions.visibilityOf(AccountIdAssert));
      if (AccountIdAssert.getText().equals("Id")) {
        Assert.assertEquals("Id", AccountIdAssert.getText());
      }else{
        Assert.assertEquals("Account Id", AccountIdAssert.getText());
      }
    System.out.println("Assert - "+AccountIdAssert.getText());
    wait.until(ExpectedConditions.visibilityOf(AccountBalanceAssert));
    Assert.assertEquals("Balance", AccountBalanceAssert.getText());
    System.out.println("Assert - "+AccountBalanceAssert.getText());
    wait.until(ExpectedConditions.visibilityOf(AccountStatusAssert));
    Assert.assertEquals("Status", AccountStatusAssert.getText());
    System.out.println("Assert - "+AccountStatusAssert.getText());
    wait.until(ExpectedConditions.visibilityOf(AccountPublicKeyAssert));
    Assert.assertEquals("Public Key", AccountPublicKeyAssert.getText());
    System.out.println("Assert - "+AccountPublicKeyAssert.getText());

    wait.until(ExpectedConditions.visibilityOf(Copy));
    Copy.click();
    System.out.println("Click - Copy");
    wait.until(ExpectedConditions.visibilityOf(Code));
    Code.click();
    System.out.println("Click - Code");
    wait.until(ExpectedConditions.visibilityOf(Copy));
    Copy.click();
    System.out.println("Click - Copy");
    wait.until(ExpectedConditions.visibilityOf(AccountIdAssert));
    AccountIdAssert.click();
    System.out.println("Click - Account Id");
    String url=driver.getCurrentUrl();
    System.out.println(url);

    if(!driver.findElements(By.xpath("//*[@class='pagination justify-content-center flex-wrap']//descendant::span[3]")).isEmpty()){
      System.out.println("---------- Next/Previous ----------");
      wait.until(ExpectedConditions.visibilityOf(Previous));
      wait.until(ExpectedConditions.visibilityOf(Next));
      Next.click();
      System.out.println("Click - Next");
      wait.until(ExpectedConditions.visibilityOf(Previous));
      Previous.click();
      System.out.println("Click - Previous");
    }else{
      System.out.println("---------- no_Next/Previous ----------");
      System.out.println("Skip >>>>>");
    }
  }

  public void searchForANode() {
    wait.until(ExpectedConditions.visibilityOf(AccountIdAssert));
      if (AccountIdAssert.getText().equals("Id")) {
        Assert.assertEquals("Id", AccountIdAssert.getText());
      }else{
        Assert.assertEquals("Account Id", AccountIdAssert.getText());
      }
    System.out.println("Assert - "+AccountIdAssert.getText());
    wait.until(ExpectedConditions.visibilityOf(AccountBalanceAssert));
    Assert.assertEquals("Balance", AccountBalanceAssert.getText());
    System.out.println("Assert - "+AccountBalanceAssert.getText());
    wait.until(ExpectedConditions.visibilityOf(AccountStatusAssert));
    Assert.assertEquals("Status", AccountStatusAssert.getText());
    System.out.println("Assert - "+AccountStatusAssert.getText());
    wait.until(ExpectedConditions.visibilityOf(AccountPublicKeyAssert));
    Assert.assertEquals("Public Key", AccountPublicKeyAssert.getText());
    System.out.println("Assert - "+AccountPublicKeyAssert.getText());

    wait.until(ExpectedConditions.visibilityOf(Copy));
    Copy.click();
    System.out.println("Click - Copy");
    wait.until(ExpectedConditions.visibilityOf(Code));
    Code.click();
    System.out.println("Click - Code");
    wait.until(ExpectedConditions.visibilityOf(Copy));
    Copy.click();
    System.out.println("Click - Copy");
  }

  public void nodeSearchnNoPosition() {
    wait.until(ExpectedConditions.visibilityOf(FailedToFetchAssert));
    Assert.assertEquals("Failed to fetch", FailedToFetchAssert.getText());
    System.out.println("Assert - FailedToFetchAssert");
  }

  public void sortingNodes() {
    wait.until(ExpectedConditions.visibilityOf(SortIdOrderAscAssert));
    System.out.println("Assert - SortIdOrderAsc");
    wait.until(ExpectedConditions.visibilityOf(AccountIdAssert));
    AccountIdAssert.click();
    System.out.println("Click - NodesId");
    wait.until(ExpectedConditions.visibilityOf(SortIdOrderDescAssert));
    System.out.println("Assert - SortIdOrderDesc");
    String url=driver.getCurrentUrl();
    System.out.println(url);
    wait.until(ExpectedConditions.visibilityOf(Next));
    Next.click();
    System.out.println("Click - Next");
    wait.until(ExpectedConditions.visibilityOf(Previous));
    Previous.click();
    System.out.println("Click - Previous");
    wait.until(ExpectedConditions.visibilityOf(SortIdOrderAscAssert));
    System.out.println("Assert - SortIdOrderAsc");
    wait.until(ExpectedConditions.visibilityOf(AccountIdAssert));
    AccountIdAssert.click();
    System.out.println("Click - NodesId");
    wait.until(ExpectedConditions.visibilityOf(SortIdOrderDescAssert));
    System.out.println("Assert - SortIdOrderDesc");
    url=driver.getCurrentUrl();
    System.out.println(url);
    wait.until(ExpectedConditions.visibilityOf(AccountIdAssert));
    wait.until(ExpectedConditions.visibilityOf(Previous));
    wait.until(ExpectedConditions.visibilityOf(Next));
    Next.click();
    System.out.println("Next -     Click");
    wait.until(ExpectedConditions.visibilityOf(AccountIdAssert));
    wait.until(ExpectedConditions.visibilityOf(Previous));
    wait.until(ExpectedConditions.visibilityOf(Next));
    Previous.click();
    System.out.println("Previous - Click");
    wait.until(ExpectedConditions.visibilityOf(AccountIdAssert));
    AccountIdAssert.click();
  }
  public void iconNode() {
    wait.until(ExpectedConditions.visibilityOf(ikon_status));
    iconNodeFor(25, "asc");
    wait.until(ExpectedConditions.visibilityOf(IdAssert));
    IdAssert.click();
    System.out.println("Click - IdAssert");
    iconNodeFor(25, "desc");

    wait.until(ExpectedConditions.visibilityOf(ikon_status));
  }
  private void iconNodeFor(int max,String order) {
    for (int s = 1; s < max; s++) {
      wait.until(ExpectedConditions.visibilityOf(ikon_status));

      String Nodes_id=String.format("//tr[%s]//td//div//a", s);
      String id=driver.findElement(By.xpath(Nodes_id)).getText();
      System.out.println("Id:     "+id);

      String Nodes_icon=String.format("//*[td][%s]//div//div//*//*", s);
      String icon_1=driver.findElement(By.xpath(Nodes_icon)).getAttribute("d");
      if (Objects.equals(icon_1, "M496 128c0 221.282-135.934 344.645-221.539 380.308a48 48 0 0 1-36.923 0C130.495 463.713 16 326.487 16 128a48 48 0 0 1 29.539-44.308l192-80a48 48 0 0 1 36.923 0l192 80A48 48 0 0 1 496 128zM256 446.313l.066.034c93.735-46.689 172.497-156.308 175.817-307.729L256 65.333v380.98z")){
        icon_1="normal";
      }
      if (Objects.equals(icon_1, "M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z")){
        icon_1="vip";
      }
      if (Objects.equals(icon_1, "M552 64H448V24c0-13.3-10.7-24-24-24H152c-13.3 0-24 10.7-24 24v40H24C10.7 64 0 74.7 0 88v56c0 35.7 22.5 72.4 61.9 100.7 31.5 22.7 69.8 37.1 110 41.7C203.3 338.5 240 360 240 360v72h-48c-35.3 0-64 20.7-64 56v12c0 6.6 5.4 12 12 12h296c6.6 0 12-5.4 12-12v-12c0-35.3-28.7-56-64-56h-48v-72s36.7-21.5 68.1-73.6c40.3-4.6 78.6-19 110-41.7 39.3-28.3 61.9-65 61.9-100.7V88c0-13.3-10.7-24-24-24zM99.3 192.8C74.9 175.2 64 155.6 64 144v-16h64.2c1 32.6 5.8 61.2 12.8 86.2-15.1-5.2-29.2-12.4-41.7-21.4zM512 144c0 16.1-17.7 36.1-35.3 48.8-12.5 9-26.7 16.2-41.8 21.4 7-25 11.8-53.6 12.8-86.2H512v16z")){
        icon_1="super vip";
      }
      System.out.println("Icon_1: "+icon_1);

      driver.findElement(By.xpath(Nodes_id)).click();

      wait.until(ExpectedConditions.visibilityOf(IdAssert));
      String icon_2 = driver.findElement(By.xpath("//tr//div//div//*//*")).getAttribute("d");
      if (Objects.equals(icon_2, "M496 128c0 221.282-135.934 344.645-221.539 380.308a48 48 0 0 1-36.923 0C130.495 463.713 16 326.487 16 128a48 48 0 0 1 29.539-44.308l192-80a48 48 0 0 1 36.923 0l192 80A48 48 0 0 1 496 128zM256 446.313l.066.034c93.735-46.689 172.497-156.308 175.817-307.729L256 65.333v380.98z")){
        icon_2="normal";
      }
      if (Objects.equals(icon_2, "M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z")){
        icon_2="vip";
      }
      if (Objects.equals(icon_2, "M552 64H448V24c0-13.3-10.7-24-24-24H152c-13.3 0-24 10.7-24 24v40H24C10.7 64 0 74.7 0 88v56c0 35.7 22.5 72.4 61.9 100.7 31.5 22.7 69.8 37.1 110 41.7C203.3 338.5 240 360 240 360v72h-48c-35.3 0-64 20.7-64 56v12c0 6.6 5.4 12 12 12h296c6.6 0 12-5.4 12-12v-12c0-35.3-28.7-56-64-56h-48v-72s36.7-21.5 68.1-73.6c40.3-4.6 78.6-19 110-41.7 39.3-28.3 61.9-65 61.9-100.7V88c0-13.3-10.7-24-24-24zM99.3 192.8C74.9 175.2 64 155.6 64 144v-16h64.2c1 32.6 5.8 61.2 12.8 86.2-15.1-5.2-29.2-12.4-41.7-21.4zM512 144c0 16.1-17.7 36.1-35.3 48.8-12.5 9-26.7 16.2-41.8 21.4 7-25 11.8-53.6 12.8-86.2H512v16z")){
        icon_2="super vip";
      }
      System.out.println("Icon_2: "+icon_2);

      if (Objects.equals(icon_1, icon_2)){
        System.out.println(">>>>> Pass");
      }else {
        System.out.println(">>>>> Fail");
      }
      Assert.assertEquals(icon_1, icon_2);

      if (Objects.equals(order, "desc")){
        wait.until(ExpectedConditions.visibilityOf(Nodes));
        Nodes.click();
        wait.until(ExpectedConditions.visibilityOf(IdAssert));
        IdAssert.click();
      }else{
        wait.until(ExpectedConditions.visibilityOf(Nodes));
        Nodes.click();
      }
    }
  }
}
