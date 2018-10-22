package ui.ads.operator.panel.pages.node;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;

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
  //  Accounts
  @FindBy(xpath = "//section//th[1]")                                                                                   private WebElement AccountIdAssert;
  @FindBy(xpath = "//section//th[2]")                                                                                   private WebElement AccountBalanceAssert;
  @FindBy(xpath = "//section//th[3]")                                                                                   private WebElement AccountStatusAssert;
  @FindBy(xpath = "//section//th[4]")                                                                                   private WebElement AccountPublicKeyAssert;


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
      System.out.println("---------- sorting_test ----------");
      wait.until(ExpectedConditions.visibilityOf(Next));
      Next.click();
      System.out.println("Click - Next");
      wait.until(ExpectedConditions.visibilityOf(Previous));
      Previous.click();
      System.out.println("Click - Previous");
    }else{
      System.out.println("---------- no_sorting_test ----------");
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
}
