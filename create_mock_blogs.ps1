# Create Mock Blogs for News Categories

# Medical News Blog 1
Write-Host "Creating Medical News blog 1..." -ForegroundColor Cyan
Invoke-RestMethod -Uri "https://pharma-test-be-1.onrender.com/api/blog" -Method POST -ContentType "application/json" -Body (@{
  title = "Latest Advances in Pharmaceutical Testing Technology"
  slug = "latest-advances-pharmaceutical-testing"
  sections = @(
    @{
      type = "paragraph"
      title = "Introduction"
      content = "The pharmaceutical industry continues to evolve with new testing methodologies and equipment. Recent advances have significantly improved the accuracy and efficiency of drug testing processes, ensuring higher quality standards and patient safety."
    }
    @{
      type = "paragraph"
      title = "Key Developments"
      content = "New automated testing systems have reduced human error and increased throughput. Modern dissolution testing equipment now offers real-time monitoring and data analysis capabilities, enabling pharmaceutical companies to streamline their quality control processes."
    }
  )
  author = "Dr. Sarah Johnson"
  informationId = "6912a2c640be394a1e8c86e0"
  tags = @("Medical News", "Testing", "Innovation")
  status = "published"
} | ConvertTo-Json -Depth 10)

Start-Sleep -Seconds 1

# Medical News Blog 2
Write-Host "Creating Medical News blog 2..." -ForegroundColor Cyan
Invoke-RestMethod -Uri "https://pharma-test-be-1.onrender.com/api/blog" -Method POST -ContentType "application/json" -Body (@{
  title = "FDA Approves New Standards for Tablet Hardness Testing"
  slug = "fda-new-standards-tablet-hardness"
  sections = @(
    @{
      type = "paragraph"
      title = "New Regulations"
      content = "The FDA has announced updated standards for tablet hardness testing that will take effect in Q1 2026. These new guidelines aim to improve consistency and reliability across the pharmaceutical manufacturing industry."
    }
    @{
      type = "paragraph"
      title = "Impact on Industry"
      content = "Pharmaceutical manufacturers will need to upgrade their testing equipment and procedures to comply with the new standards. This presents an opportunity to invest in modern, more accurate testing instruments."
    }
  )
  author = "Dr. Michael Chen"
  informationId = "6912a2c640be394a1e8c86e0"
  tags = @("Medical News", "FDA", "Regulations")
  status = "published"
} | ConvertTo-Json -Depth 10)

Start-Sleep -Seconds 1

# Health Tips Blog 1
Write-Host "Creating Health Tips blog 1..." -ForegroundColor Green
Invoke-RestMethod -Uri "https://pharma-test-be-1.onrender.com/api/blog" -Method POST -ContentType "application/json" -Body (@{
  title = "Best Practices for Laboratory Equipment Maintenance"
  slug = "best-practices-laboratory-equipment-maintenance"
  sections = @(
    @{
      type = "paragraph"
      title = "Regular Calibration"
      content = "Maintaining accurate calibration of your pharmaceutical testing equipment is crucial for reliable results. Schedule regular calibration checks according to manufacturer guidelines and regulatory requirements."
    }
    @{
      type = "paragraph"
      title = "Preventive Maintenance"
      content = "Implement a comprehensive preventive maintenance program to extend equipment lifespan and ensure consistent performance. Keep detailed maintenance logs for regulatory compliance and troubleshooting purposes."
    }
  )
  author = "John Smith"
  informationId = "6912a2c740be394a1e8c86e3"
  tags = @("Health Tips", "Maintenance", "Equipment")
  status = "published"
} | ConvertTo-Json -Depth 10)

Start-Sleep -Seconds 1

# Health Tips Blog 2
Write-Host "Creating Health Tips blog 2..." -ForegroundColor Green
Invoke-RestMethod -Uri "https://pharma-test-be-1.onrender.com/api/blog" -Method POST -ContentType "application/json" -Body (@{
  title = "5 Essential Safety Tips for Pharmaceutical Laboratories"
  slug = "safety-tips-pharmaceutical-laboratories"
  sections = @(
    @{
      type = "paragraph"
      title = "Proper Equipment Handling"
      content = "Always follow manufacturer guidelines when operating pharmaceutical testing equipment. Wear appropriate personal protective equipment (PPE) and ensure proper training for all laboratory personnel."
    }
    @{
      type = "paragraph"
      title = "Workspace Organization"
      content = "Maintain a clean and organized laboratory environment. Proper storage and labeling of materials, regular cleaning schedules, and clear emergency procedures are essential for laboratory safety."
    }
  )
  author = "Emily Roberts"
  informationId = "6912a2c740be394a1e8c86e3"
  tags = @("Health Tips", "Safety", "Laboratory")
  status = "published"
} | ConvertTo-Json -Depth 10)

Start-Sleep -Seconds 1

# Promotions Blog 1
Write-Host "Creating Promotions blog 1..." -ForegroundColor Yellow
Invoke-RestMethod -Uri "https://pharma-test-be-1.onrender.com/api/blog" -Method POST -ContentType "application/json" -Body (@{
  title = "Special Offer: 20% Off PTB 330 Tablet Hardness Tester"
  slug = "special-offer-ptb-330-tablet-hardness-tester"
  sections = @(
    @{
      type = "paragraph"
      title = "Limited Time Promotion"
      content = "Take advantage of our special promotion on the newly revised PTB 330 Tablet Hardness Tester. This state-of-the-art equipment offers enhanced accuracy and reliability for pharmaceutical quality control."
    }
    @{
      type = "paragraph"
      title = "Offer Details"
      content = "Get 20% off the regular price when you order before December 31, 2025. This promotion includes free installation and training. Contact our sales team for more information and to place your order."
    }
  )
  author = "Marketing Team"
  informationId = "6912a2c840be394a1e8c86e6"
  tags = @("Promotions", "Special Offer", "PTB 330")
  status = "published"
} | ConvertTo-Json -Depth 10)

Start-Sleep -Seconds 1

# Promotions Blog 2
Write-Host "Creating Promotions blog 2..." -ForegroundColor Yellow
Invoke-RestMethod -Uri "https://pharma-test-be-1.onrender.com/api/blog" -Method POST -ContentType "application/json" -Body (@{
  title = "Year-End Sale: Save Up to 30% on Dissolution Testing Equipment"
  slug = "year-end-sale-dissolution-testing"
  sections = @(
    @{
      type = "paragraph"
      title = "Exclusive Year-End Offer"
      content = "Upgrade your laboratory with our premium dissolution testing systems at incredible year-end prices. Save up to 30% on select models including our popular PTWK series."
    }
    @{
      type = "paragraph"
      title = "Bundle Packages Available"
      content = "Combine multiple instruments and save even more with our bundle packages. Each package includes comprehensive warranty, maintenance support, and operator training. Limited quantities available."
    }
  )
  author = "Sales Department"
  informationId = "6912a2c840be394a1e8c86e6"
  tags = @("Promotions", "Sale", "Dissolution Testing")
  status = "published"
} | ConvertTo-Json -Depth 10)

Write-Host "`nAll blogs created successfully!" -ForegroundColor Green
